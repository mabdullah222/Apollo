import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const VideoPlayer = ({ src }) => {
  const [videoSources, setVideoSources] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  // Initialize video sources
  useEffect(() => {
    // Use provided src if available, otherwise use numbered videos
    if (src && src !== "/sample-video.mp4") {
      setVideoSources([src]);
    } else {
      // Use the four numbered videos you have
      setVideoSources(["/1.mp4", "/2.mp4", "/3.mp4", "/4.mp4"]);
    }
  }, [src]);

  // Handle video end to play the next video in sequence
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % videoSources.length;
      return nextIndex;
    });
  };

  // Play the current video when index changes
  useEffect(() => {
    if (videoRef.current && videoSources.length > 0) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.log("Video playback failed:", err);
      });
    }
  }, [currentVideoIndex, videoSources]);

  if (videoSources.length === 0) {
    return (
      <Card className="h-full border border-gray-300">
        <CardContent className="flex items-center justify-center h-full">
          <div>Loading video...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border border-gray-300">
      <CardContent className="flex items-center justify-center h-full">
        <video 
          ref={videoRef}
          controls 
          className="h-full aspect-[9/16] rounded-lg"
          onEnded={handleVideoEnd}
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;