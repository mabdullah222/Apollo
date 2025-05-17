'use client';

import React, { useState, useEffect } from 'react';
import HelloCard from './hello-card';
import CourseScroll from './course-scroll';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';

const Welcome = () => {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUserLectures, setShowUserLectures] = useState(true);
    const { user } = useUser();

    // Fetch the user's lectures on component mount
    useEffect(() => {
        const fetchUserLectures = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lectures`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch lectures: ${response.status}`);
                }
                const data = await response.json();
                setLectures(data);
            } catch (err) {
                console.error('Error fetching lectures:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserLectures();
    }, []);

    console.log(lectures)

    return (
        <div className="w-full min-h-screen flex flex-col p-6">
            {/* Header Section with HelloCard */}
            <HelloCard />
            
            {/* CourseScroll with toggle functionality */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-black mb-4">
                    {showUserLectures ? "My Courses" : "All Available Courses"}
                </h2>
                <CourseScroll 
                    lectures={lectures} 
                    loading={loading} 
                    error={error}
                    showUserLectures={showUserLectures}
                    onToggleUserLectures={() => setShowUserLectures(prev => !prev)}
                    userClerkId={user?.id}
                    showToggle={true}
                />
            </div>
        </div>
    );
};

export default Welcome;