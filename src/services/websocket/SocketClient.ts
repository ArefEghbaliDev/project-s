import { getPeerInstance, PeerToPeerConnection } from "services/p2p/PeerToPeerConnection";
import { AppDispatch } from "services/redux/store";
import { io, Socket } from "socket.io-client";

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
        });

        this.socket.on("joined-room", async () => {
            console.log("Joined room");
            await this.p2p.createOffer(this.socket, room);
        });

        this.socket.on("new-data", async (data) => {
            const parsedData = JSON.parse(data);

            if (parsedData.type === "offer") {
                await this.p2p.createAnswer(this.socket, room, parsedData.offer);
            }

            if (parsedData.type === "answer") {
                await this.p2p.addAnswer(parsedData.answer);
            }

            if (parsedData.type === "candidate") {
                await this.p2p.addIceCandidate(parsedData.candidate);
            }
        });
    }

    public get getSocket() {
        return this.socket;
    }

    public readyForMatch() {
        this.socket.emit("matching", {
            name: "Aref",
        });
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
