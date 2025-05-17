'use client';

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import VideoPlayer from "@/components/videoplayer";
import SlidesGenerator from "@/components/slides-generator";
import AskQuestion from "@/components/ask-question";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const VideoPage = () => {

  const router = useRouter();

  const params = useParams();
  const id = params?.id;
  const [lectureData, setLectureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchLectureData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/lecture-status/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch lecture: ${response.status}`);
        }
        
        const data = await response.json();
        setLectureData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching lecture data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLectureData();
  }, [id]);

  // Handle slide change event
  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">Loading lecture...</div>
          <Progress className="w-48 mx-auto" value={50} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!lectureData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div>Lecture not found</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-6 mb-5">

      {/* <h1 className="text-black text-2xl font-bold mb-2 capitalize">{lectureData.topic || "Untitled Lecture"}</h1> */}

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-black text-2xl font-bold capitalize">
          {lectureData.topic || "Untitled Lecture"}
        </h1>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
          onClick={() => router.push(`/quiz/${id}`)}
        >
          Take Quiz
        </button>
      </div>

      
      <div className="mb-6 flex justify-end items-center">
        <div className="text-sm text-gray-500">
          Status: <span className="capitalize">{lectureData.completed ? "Completed" : "In Progress"}</span>
        </div>
      </div>

      {/* Slides and Video Frames */}
      <div className="flex gap-4 justify-center items-start w-full h-[600px] overflow-hidden border border-gray-300 rounded-xl shadow-md p-4 mb-4">
        <div className="w-[75%] h-full flex-none">
            <SlidesGenerator 
              slides={lectureData.slides} 
              onSlideChange={handleSlideChange}
              currentSlideIndex={currentSlideIndex}
            />
        </div>
        <div className="w-[25%] h-full flex-none">
            <VideoPlayer 
            src={lectureData.video_paths && lectureData.video_paths.length > 0 
                ? lectureData.video_paths[0] 
                : "/sample-video.mp4"} 
            />
        </div>
      </div>

      {/* Ask Question Section */}
      <AskQuestion 
        lectureId={id} 
        lectureData={lectureData} 
        currentSlideIndex={currentSlideIndex}
      />
    </div>
  );
};

export default VideoPage;