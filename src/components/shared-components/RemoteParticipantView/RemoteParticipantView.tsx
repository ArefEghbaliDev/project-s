import clsx from "clsx";
import hark, { Harker } from "hark";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import useUpdateEffect from "hooks/useUpdateEffect";
import React, { useRef } from "react";
import { getPeerInstance } from "services/p2p/PeerToPeerConnection";

const RemoteParticipantView = () => {
    const dispatch = useAppDispatch();

    const peerState = useAppSelector((state) => state.peer);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const setVideoStream = (stream: MediaStream) => {
        if (videoRef.current) {
            const videoStream = new MediaStream();

            console.log("video stream", stream.getVideoTracks().length);

            stream.getVideoTracks().forEach((track) => {
                videoStream.addTrack(track);
            });

            console.log("video stream", videoStream);

            videoRef.current.srcObject = videoStream;
        }
    };

    const setAudioStream = (stream: MediaStream) => {
        if (audioRef.current) {
            const audioStream = new MediaStream();

            console.log("audio stream", stream.getAudioTracks().length);

            stream.getAudioTracks().forEach((track) => {
                audioStream.addTrack(track);
            });

            audioRef.current.srcObject = audioStream;
        }
    };

    useUpdateEffect(() => {
        if (peerState.peerConnectionStatus === "created") {
            const p2p = getPeerInstance(dispatch);
            if (videoRef.current && audioRef.current) {
                if (peerState.remoteStreamState.video) {
                    console.log("p2p", p2p.getRemoteStream, p2p.getRemoteStream.getTracks().length);

                    setVideoStream(p2p.getRemoteStream);
                }
                if (peerState.remoteStreamState.audio) {
                    setAudioStream(p2p.getRemoteStream);
                }
            }
        }
    }, [peerState.peerConnectionStatus, peerState.remoteStreamState]);

    return (
        <div className={clsx("overflow-hidden w-60 h-52 absolute right-5 rounded bottom-5 shadow-lg")}>
            <video ref={videoRef} muted playsInline autoPlay className="object-cover absolute left-0 top-0 w-full h-full" />
            <audio ref={audioRef} autoPlay />
        </div>
    );
};

export default RemoteParticipantView;
