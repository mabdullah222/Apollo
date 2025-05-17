"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

const AskQuestion = ({ lectureId, lectureData, currentSlideIndex = 0 }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  console.log(currentSlideIndex)
  // Get the current slide content and lecture transcript
  const getCurrentSlideContent = () => {
    if (!lectureData?.slides || lectureData.slides.length === 0) {
      return "";
    }
    
    const slide = lectureData.slides[currentSlideIndex];
    let content = "";
    
    // Extract text content
    if (slide?.content) {
      // If content is HTML, try to extract plain text
      if (typeof slide.content === 'string' && slide.content.includes('<')) {
        try {
          // Simple HTML stripping for text extraction
          const stripHtml = (html) => {
            return html.replace(/<[^>]*>/g, ' ')
                      .replace(/\s{2,}/g, ' ')
                      .trim();
          };
          content = stripHtml(slide.content);
        } catch (e) {
          console.error("Error parsing slide content:", e);
          content = slide.content;
        }
      } else {
        content = slide.content;
      }
    }
    
    // Add code information if available
    if (slide?.code) {
      content += "\n\nCode Example:\n" + slide.code;
    }
    
    return content;
  };

  const getCurrentSlideLecture = () => {
    if (!lectureData?.slides || lectureData.slides.length === 0) {
      return "";
    }
    return lectureData.slides[currentSlideIndex]?.lecture || "";
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    // Save the current question before clearing the input
    const currentQuestion = question;
    setLoading(true);
    
    // Add the question to chat history immediately with a pending status
    setChatHistory((prev) => [
      ...prev, 
      { 
        question: currentQuestion, 
        response: null, 
        status: 'pending' 
      }
    ]);
    
    // Clear input so user can ask another question
    setQuestion("");
    
    try {
      // Get the current slide content and lecture
      const content = getCurrentSlideContent();
      const lecture = getCurrentSlideLecture();
      
      // Make API call to backend
      const response = await fetch("/api/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vector_db: lectureData.vector_db || lectureId, // Use vector_db from lectureData or fallback to lectureId
          content: content,
          lecture: lecture,
          question: currentQuestion,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `API call failed with status: ${response.status}`);
      }
      
      // Update chat history with the actual response
      setChatHistory((prev) => 
        prev.map(item => 
          item.question === currentQuestion && item.status === 'pending'
            ? { question: currentQuestion, response: data.answer, status: 'complete' }
            : item
        )
      );
    } catch (error) {
      console.error("Error asking question:", error);
      // Update the pending item with error status
      setChatHistory((prev) => 
        prev.map(item => 
          item.question === currentQuestion && item.status === 'pending'
            ? { 
                question: currentQuestion, 
                response: "Sorry, there was an error processing your question. Please try again.", 
                status: 'error' 
              }
            : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg border border-gray-300 w-full">
      <h2 className="text-black text-xl font-bold mb-2">Ask a Question</h2>
      
      {lectureData?.slides && lectureData.slides.length > 0 && (
        <p className="text-sm text-gray-500 mb-3">
          About slide: {lectureData.slides[currentSlideIndex]?.title || `Slide ${currentSlideIndex + 1}`}
        </p>
      )}

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()} // Handle Enter key
          className="flex-1 p-2 border rounded-lg text-black"
          disabled={loading}
        />
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleAskQuestion} 
          disabled={loading} 
          className="cursor-pointer"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5 text-black" />}
        </Button>
      </div>

      <div className="mt-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className="p-2 border-b border-gray-300">
            <p className="text-black font-semibold">You: {chat.question}</p>
            
            {chat.status === 'pending' ? (
              <div className="text-gray-500 flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Generating response...
              </div>
            ) : chat.status === 'error' ? (
              <p className="text-red-500">
                Error: {chat.response}
              </p>
            ) : (
              <p className="text-gray-700">AI: {chat.response}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AskQuestion;