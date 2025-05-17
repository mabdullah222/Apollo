import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SlidesGenerator = ({ slides = [] }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // If no slides are provided, show a placeholder
  if (!slides || slides.length === 0) {
    return (
      <Card className="flex flex-col justify-center items-center w-1/2 h-96 shadow-md rounded-2xl">
        <CardContent className="pt-6 text-center space-y-2">
          <h3 className="text-xl font-semibold mb-2">No Slides Available</h3>
          <p className="text-gray-500">This lecture doesn't have any slides yet.</p>
        </CardContent>
      </Card>
    );
  }

  const currentSlide = slides[currentSlideIndex];

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  return (
    <Card className="flex flex-col w-full h-full shadow-md rounded-2xl">
      <CardContent className="pt-6 pb-4 px-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{currentSlide.title}</h3>
          <div className="text-sm text-gray-500">
            Slide {currentSlideIndex + 1} of {slides.length}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 p-2 bg-white rounded-md">
          <div className="whitespace-pre-wrap text-justify text-gray-700">{currentSlide.content}</div>
          
          {currentSlide.code && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md overflow-x-auto border border-gray-200">
              <pre className="text-sm text-gray-800"><code>{currentSlide.code}</code></pre>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPreviousSlide}
            disabled={currentSlideIndex === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="gap-1"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlidesGenerator;
