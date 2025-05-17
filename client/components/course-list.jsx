import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseScroll from './course-scroll';

const CourseList = ({ lectures, loading, error }) => {

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-black mb-4">All Courses</h2>
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 bg-white shadow-sm">
                    <TabsTrigger value="all">All</TabsTrigger>
                    {/* <TabsTrigger value="completed">Completed</TabsTrigger> */}
                    <TabsTrigger value="processing">Processing</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <CourseScroll type="all" />
                </TabsContent>
                {/* <TabsContent value="completed">
                    <CourseScroll type="completed" />
                </TabsContent> */}
                <TabsContent value="processing">
                    <CourseScroll type="processing" />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CourseList;