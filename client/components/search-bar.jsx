import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = ({ onSearchResults, lectures = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            onSearchResults([]);
            return;
        }

        const term = searchTerm.toLowerCase();
        const filteredLectures = lectures.filter(lecture => {
            const topic = lecture.data?.topic?.toLowerCase() || '';
            const subject = lecture.data?.subject?.toLowerCase() || '';
            const gradeLevel = lecture.data?.grade_level?.toLowerCase() || '';
            
            return (
                topic.includes(term) ||
                subject.includes(term) ||
                gradeLevel.includes(term)
            );
        });

        onSearchResults(filteredLectures);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2 w-full text-black">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    className="pl-10"
                    placeholder="Search topics, subjects, grade levels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button type="submit">Search</Button>
        </form>
    );
};

export default SearchBar;