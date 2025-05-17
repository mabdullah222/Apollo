'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CourseCard = ({ id, name, writer, duration, status }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/video/${id}`);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all" 
      onClick={handleClick}
    >
      <CardContent className="pt-4">
        <h3 className="font-bold text-lg capitalize">{name}</h3>
        <div className="text-sm text-gray-500 mt-1">
          <span>{writer} • {duration}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="w-full">
          <div className="text-sm">
            <span className="capitalize">{status === 'in_progress' ? 'In Progress' : status}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;