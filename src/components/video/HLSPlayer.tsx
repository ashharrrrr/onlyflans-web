"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js"

type HLSPlayerProps = {
  src: string;
}

export function HLSPlayer({ src }: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(src);
      hls.attachMedia(video)

      return () => {
        hls.destroy();
      }
    }
  }, [src]);

  return (
    <video ref={videoRef} controls playsInline className="w-full" />
  )
}
