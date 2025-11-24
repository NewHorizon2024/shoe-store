/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

import * as gtag from "./gtag";

export default function VideoTracker({ videoId }: { videoId: string }) {
  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // When API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      new (window as any).YT.Player(videoId, {
        events: {
          onStateChange: (event: any) => {
            if (event.data === 1) {
              gtag.event("video_start", { video_id: videoId });
            }
            if (event.data === 2) {
              gtag.event("video_pause", { video_id: videoId });
            }
            if (event.data === 0) {
              gtag.event("video_complete", { video_id: videoId });
            }
          },
        },
      });
    };
  }, [videoId]);

  return null;
}
