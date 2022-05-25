import { useEffect, useRef } from "react";

const ParticipantView = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const getVideoStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    };

    useEffect(() => {
        getVideoStream();
    }, [videoRef]);

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <video ref={videoRef} muted playsInline autoPlay className="object-contain absolute left-0 top-0 w-full h-full" />
        </div>
    );
};

export default ParticipantView;
