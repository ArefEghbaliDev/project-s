import { getPeerInstance, PeerToPeerConnection } from "services/p2p/PeerToPeerConnection";
import { AppDispatch } from "services/redux/store";
import { io, Socket } from "socket.io-client";

import { v4 as uuidV4 } from "uuid";

export class SocketClient {
    private socket: Socket;
    private p2p: PeerToPeerConnection;

    constructor(dispatch: AppDispatch) {
        this.p2p = getPeerInstance(dispatch);

        const socketIo = io("ws://localhost:3333", {
            path: "/pipe",
            transports: ["websocket"],
            timeout: 4000,
            autoConnect: true,
            reconnection: false,
        });

        this.socket = socketIo;

        const room = "Aref";

        this.socket.on("connect", () => {
            console.log("CONNECTED");

            this.socket.emit("matching", {
                name: room,
            });
        });

        this.socket.on("joined-room", () => {
            console.log("Joined room");
            this.p2p.createOffer(this.socket, room);
        });

        this.socket.on("new-data", (data) => {
            console.log("peer data", data);

            const parsedData = JSON.parse(data);

            if (parsedData.type === "offer") {
                console.log("adding data", parsedData.type, parsedData.offer);
                this.p2p.createAnswer(this.socket, room, parsedData.offer);
            }

            if (parsedData.type === "answer") {
                console.log("adding data", parsedData.type, parsedData.answer);
                this.p2p.addAnswer(parsedData.answer);
            }

            if (parsedData.type === "candidate") {
                console.log("candidate", parsedData);
                console.log("adding candidate", parsedData.type, parsedData.candidate);
                this.p2p.addIceCandidate(parsedData.candidate);
            }
        });
    }

    public get getSocket() {
        return this.socket;
    }
}

let socketInstance: SocketClient;

export const getSocketInstance = (dispatch: AppDispatch) => {
    if (socketInstance) {
        return socketInstance;
    } else {
        socketInstance = new SocketClient(dispatch);
        return socketInstance;
    }
};
