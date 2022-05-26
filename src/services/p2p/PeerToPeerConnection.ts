import { updateIsRemoteStreamReceived, updatePeerConnectionStatus } from "services/redux/slices/peer";
import { AppDispatch } from "services/redux/store";
import { Socket } from "socket.io-client";

export class PeerToPeerConnection {
    private peerConnection: RTCPeerConnection | null;
    private servers: RTCConfiguration;

    private dispatch: AppDispatch;

    private remoteStream: MediaStream;
    private localStream: MediaStream;

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch;
        this.peerConnection = null;
        this.servers = {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        };

        this.remoteStream = new MediaStream();
        this.localStream = new MediaStream();
    }

    private async createPeerConnection(socket: Socket): Promise<RTCPeerConnection> {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        const peerConnection = new RTCPeerConnection(this.servers);

        stream.getTracks().forEach((track) => {
            this.localStream.addTrack(track);
        });

        stream.getTracks().forEach((track) => {
            peerConnection.addTrack(track);
        });

        this.dispatch(updatePeerConnectionStatus("created"));

        this.peerConnection = peerConnection;
        ``;

        this.peerConnection.ontrack = (event) => {
            console.log("peer connection track", event);
            this.dispatch(updateIsRemoteStreamReceived(true));
            this.remoteStream.addTrack(event.track);
        };

        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                // TODO
                // Candidate
                socket.emit("peer-data", {
                    data: JSON.stringify({ type: "candidate", candidate: event.candidate }),
                    name: "Aref",
                });
            }
        };

        return peerConnection;
    }

    public createOffer = async (socket: Socket, room: string) => {
        const connection = await this.createPeerConnection(socket);

        const SDPOffer = await connection.createOffer();
        await connection.setLocalDescription(SDPOffer);

        console.log("emit offer", SDPOffer);
        socket.emit("peer-data", {
            data: JSON.stringify({ type: "offer", offer: SDPOffer }),
            name: room,
        });
    };

    public createAnswer = async (socket: Socket, room: string, offer: RTCSessionDescriptionInit) => {
        const connection = await this.createPeerConnection(socket);

        console.log("recv offer", offer);

        await connection.setRemoteDescription(offer);

        const answer = await connection.createAnswer();

        console.log("Created answer", answer);

        await connection.setLocalDescription(answer);

        this.dispatch(updatePeerConnectionStatus("created"));

        socket.emit("peer-data", {
            data: JSON.stringify({ type: "answer", answer: answer }),
            name: room,
        });
    };

    public addAnswer = async (answer: RTCSessionDescriptionInit) => {
        console.log("recv answer", answer);

        if (!this.peerConnection?.currentRemoteDescription) {
            this.peerConnection?.setRemoteDescription(answer);
        }
    };

    public addIceCandidate = async (candiate: RTCIceCandidate) => {
        console.log("Add ice candidate", candiate);
        this.peerConnection?.addIceCandidate(candiate);
    };

    public addLocalTrack(stream: MediaStream) {
        stream.getTracks().forEach((track) => {
            console.log("adding tracks", track);
            this.peerConnection?.addTrack(track, stream);
        });
    }

    public get getRemoteStream(): MediaStream {
        console.log("this remote stream", this.remoteStream);
        return this.remoteStream;
    }

    public get getLocalStream(): MediaStream {
        return this.localStream;
    }
}

let instance: PeerToPeerConnection;

export const getPeerInstance = (dispatch: AppDispatch) => {
    if (instance) {
        return instance;
    } else {
        instance = new PeerToPeerConnection(dispatch);

        return instance;
    }
};
