import useGetCamera from "hooks/useGetCamera";
import { useRef } from "react";
import ParticipantControls from "../ParticipantControls";

const ParticipantView = () => {

  const localVideoRef = useRef<HTMLVideoElement | null>(null)

  useGetCamera(localVideoRef)

  return (
    <div className="relative w-screen h-screen">
      <video muted controls={false} playsInline ref={localVideoRef} className="absolute inset-0 w-full h-full object-contain" />
      <ParticipantControls />
    </div>
  );
};

export default ParticipantView;
