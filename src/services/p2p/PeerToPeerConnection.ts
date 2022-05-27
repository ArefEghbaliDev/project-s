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
        console.log("CONSTRUCTOR");

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
        const peerConnection = new RTCPeerConnection(this.servers);

        this.localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, this.localStream);
        });

        this.dispatch(updatePeerConnectionStatus("created"));

        this.peerConnection = peerConnection;

        this.peerConnection.ontrack = (event) => {
            this.remoteStream.addTrack(event.track);
            this.dispatch(
                updateIsRemoteStreamReceived({
                    type: event.track.kind === "audio" ? "audio" : "video",
                    state: true,
                })
            );
        };

        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
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

        let SDPOffer = await connection.createOffer();

        SDPOffer.sdp?.replace("useinbandfec=1", "useinbandfec=1; stereo=1; maxaveragebitrate=510000");

        await connection.setLocalDescription(SDPOffer);

        const codecList = RTCRtpSender.getCapabilities("audio");

        console.log("codec list", codecList);

        console.log("SDP", SDPOffer);

        socket.emit("peer-data", {
            data: JSON.stringify({ type: "offer", offer: SDPOffer }),
            name: room,
        });
    };

    public createAnswer = async (socket: Socket, room: string, offer: RTCSessionDescriptionInit) => {
        const connection = await this.createPeerConnection(socket);

        await connection.setRemoteDescription(offer);

        let answer = await connection.createAnswer();

        answer.sdp?.replace("useinbandfec=1", "useinbandfec=1; stereo=1; maxaveragebitrate=510000");

        console.log("create answer");

        await connection.setLocalDescription(answer);

        this.dispatch(updatePeerConnectionStatus("created"));

        socket.emit("peer-data", {
            data: JSON.stringify({ type: "answer", answer: answer }),
            name: room,
        });
    };

    public addAnswer = async (answer: RTCSessionDescriptionInit) => {
        if (!this.peerConnection?.currentRemoteDescription) {
            this.peerConnection?.setRemoteDescription(answer);
        }
    };

    public addIceCandidate = async (candiate: RTCIceCandidate) => {
        try {
            await this.peerConnection?.addIceCandidate(candiate);
        } catch (err) {
            console.log("candidate error", err);
        }
    };

    public get getRemoteStream(): MediaStream {
        console.log("this remote stream", this.remoteStream);
        return this.remoteStream;
    }

    public set setLocalStream(stream: MediaStream) {
        stream.getTracks().forEach((track) => {
            this.localStream.addTrack(track);
        });
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
