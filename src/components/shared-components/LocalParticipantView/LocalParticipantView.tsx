import clsx from "clsx";
import { useAppDispatch } from "hooks/useReduxHooks";
import useUpdateEffect from "hooks/useUpdateEffect";
import { useEffect, useRef } from "react";
import { getPeerInstance } from "services/p2p/PeerToPeerConnection";
import { getSocketInstance } from "services/websocket/SocketClient";

const LocalParticipantView = () => {
    const dispatch = useAppDispatch();

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const getUserStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        const p2p = getPeerInstance(dispatch);
        p2p.setLocalStream = stream;

        if (videoRef.current) {
            const videoStream = new MediaStream();

            stream.getVideoTracks().forEach((track) => {
                videoStream.addTrack(track);
            });

            console.log("video stream", videoStream);

            videoRef.current.srcObject = videoStream;

            const socket = getSocketInstance(dispatch);
            socket.readyForMatch();
        }

        return stream;
    };

    useUpdateEffect(() => {
        console.log("fire");
        if (videoRef.current) {
            console.log("running");

            getUserStream();
        }
    }, []);

    return (
        <div className={clsx("overflow-hidden relative local-participant")}>
            <video ref={videoRef} muted playsInline autoPlay className="object-cover absolute left-0 top-0 w-full h-full" />
        </div>
    );
};

export default LocalParticipantView;
