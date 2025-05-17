'use client';

import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseCard from './course-card';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CourseScroll = ({ 
  lectures = [], 
  loading = false, 
  error = null, 
  type = null, 
  showUserLectures = false, 
  onToggleUserLectures = null, 
  userClerkId = null,
  showToggle = false
}) => {
    if (loading) {
        return <div className="w-full text-center py-8 text-black">Loading lectures...</div>;
    }

    if (error) {
        return <div className="w-full text-center py-8 text-red-500">Error: {error}</div>;
    }

    if (!lectures || lectures.length === 0) {
        return <div className="w-full text-center py-8 text-black">
            {showUserLectures ? "You haven't created any courses yet." : "No lectures found. Generate a new lecture!"}
        </div>;
    }

    // First filter by type if specified (e.g., ongoing or completed)
    const filteredByType = type 
        ? lectures.filter(lecture => {
            // Handle both API and database lecture formats
            if (type === 'ongoing') {
                return lecture.status === 'in_progress' || 
                       (lecture.completed !== undefined && lecture.completed === false);
            } else if (type === 'completed') {
                return lecture.status === 'completed' || 
                       (lecture.completed !== undefined && lecture.completed === true);
            }
            return true;
          })
        : lectures;
    
    // Then filter by user if needed
    const filteredLectures = (showUserLectures && userClerkId)
        ? filteredByType.filter(lecture => lecture.userId === userClerkId)
        : filteredByType;

    return (
        <div className="w-full">
            {/* Show toggle on both pages */}
            {showToggle && onToggleUserLectures && (
                <div className="flex items-center space-x-2 mb-4">
                    <Switch 
                        id="user-lectures" 
                        checked={showUserLectures}
                        onCheckedChange={onToggleUserLectures}
                    />
                    <Label htmlFor="user-lectures" className="text-sm font-medium">
                        {showUserLectures ? "My Courses" : "All Courses"}
                    </Label>
                </div>
            )}
            
            <ScrollArea className="w-full h-[500px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredLectures.length > 0 ? (
                        filteredLectures.map((lecture) => (
                            <CourseCard 
                                key={lecture.lecture_id || lecture.id}
                                id={lecture.lecture_id || lecture.id}
                                name={lecture.data?.topic || lecture.topic || 'Untitled Lecture'}
                                writer={lecture.data?.subject || 'Unknown Subject'}
                                duration={lecture.data?.grade_level || 'N/A'}
                                status={lecture.status || (lecture.completed ? 'completed' : 'in_progress')}
                            />
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-8 text-black">
                            {showUserLectures && type === 'ongoing' ? "You have no ongoing courses." : 
                             showUserLectures && type === 'completed' ? "You have no completed courses." :
                             showUserLectures ? "You haven't created any courses yet." : 
                             type === 'ongoing' ? "No ongoing courses available." : 
                             type === 'completed' ? "No completed courses available." : 
                             "No courses available."}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default CourseScroll;