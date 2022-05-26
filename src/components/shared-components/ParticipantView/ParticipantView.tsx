import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { useEffect, useRef } from "react";
import { getPeerInstance } from "services/p2p/PeerToPeerConnection";

interface IProps {
    isLocal: boolean;
}

const ParticipantView = ({ isLocal }: IProps) => {
    const dispatch = useAppDispatch();

    const peerState = useAppSelector((state) => state.peer);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const setVideoStream = (stream: MediaStream) => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    };

    useEffect(() => {
        if (peerState.peerConnectionStatus === "created") {
            console.log("peer created");
            const p2p = getPeerInstance(dispatch);

            if (isLocal) {
                setVideoStream(p2p.getLocalStream);
            } else {
                if (peerState.isRemoteStreamReceived) {
                    setVideoStream(p2p.getRemoteStream);
                }
            }
        }
    }, [videoRef, isLocal, peerState.isRemoteStreamReceived, peerState.peerConnectionStatus]);

    return (
        <div
            className={clsx("overflow-hidden", {
                "w-screen h-screen relative": isLocal,
                "w-60 h-52 absolute right-5 rounded bottom-5 shadow-lg": !isLocal,
            })}
        >
            <video ref={videoRef} muted playsInline autoPlay className="object-cover absolute left-0 top-0 w-full h-full" />
        </div>
    );
};

export default ParticipantView;
