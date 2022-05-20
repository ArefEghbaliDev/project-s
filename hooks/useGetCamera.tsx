import { MutableRefObject, useCallback, useEffect } from "react"

const useGetCamera = (videoRef: MutableRefObject<HTMLVideoElement | null>): void => {

    const getCameraStream = useCallback(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            frameRate: {
              min: 15,
              ideal: 30
            },
            width: {
              min: 800,
              max: 1920,
              ideal: 1280
            },
            height: {
              min: 600,
              max: 1080,
              ideal: 720
            }
          }
        })

        if(videoRef.current) {
          const videoTrack = stream.getVideoTracks()[0]

          videoRef.current.srcObject = new MediaStream([videoTrack])
        }
      }catch(err) {
        console.error("get camera", err)
      }
    },[videoRef])

    useEffect(() => {
      if(videoRef.current) {
        getCameraStream();
      }
    },[videoRef])
}

export default useGetCamera