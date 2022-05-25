import { io, Socket } from "socket.io-client";

export class SocketClient {
    private socket: Socket;

    constructor() {
        const socketIo = io("ws://localhost:3333", {
            path: "/pipe",
            transports: ["websocket"],
            timeout: 4000,
            autoConnect: true,
            reconnection: false,
        });

        this.socket = socketIo;

        this.socket.on("connect", () => {
            console.log("CONNECTED");
        });
    }

    public get getSocket() {
        return this.socket;
    }
}

let socketInstance: SocketClient;

export const getSocketInstance = () => {
    if (socketInstance) {
        return socketInstance;
    } else {
        socketInstance = new SocketClient();
        return socketInstance;
    }
};
