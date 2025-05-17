import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

const GenerateTopicModal = ({ isOpen, onClose, onSuccess, onQueued }) => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lectureData, setLectureData] = useState({
    topic: "",
    subject: "",
    grade_level: "",
    lecture_type: "video",
    additional_context: ""
  });

  const handleChange = (field, value) => {
    setLectureData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (onClose) {
        onClose();
      }
      
      toast.info("Starting lecture generation. This may take up to 15 minutes.");
      
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generate-lecture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: lectureData.topic,
          clerkUserId: userId,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to generate lecture");
        }
        return response.json();
      })
      .then(data => {
        console.log("Lecture generation response:", data);
        toast.success("Lecture generation completed successfully!");
        
        if (onSuccess) {
          onSuccess();
        }
        
        if (onQueued) {
          onQueued();
        }
      })
      .catch(err => {
        console.error("Error generating lecture:", err);
        toast.error("Failed to generate lecture. Please try again.");
        setError(err.message);
      });
      
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit the form. Please try again.");
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate a New Lecture</DialogTitle>
          <DialogDescription>
            Fill in the details below to generate a new lecture topic.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g. Photosynthesis, Algebra Fundamentals, French Revolution"
                value={lectureData.topic}
                onChange={(e) => handleChange('topic', e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="e.g. Biology, Mathematics, History"
                value={lectureData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="grade_level">Grade Level *</Label>
              <Select 
                value={lectureData.grade_level} 
                onValueChange={(value) => handleChange('grade_level', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary School</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="graduate">Graduate Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="lecture_type">Lecture Type</Label>
              <Select 
                value={lectureData.lecture_type} 
                onValueChange={(value) => handleChange('lecture_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a lecture type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  {/* <SelectItem value="interactive">Interactive</SelectItem>
                  <SelectItem value="visual">Visual-focused</SelectItem>
                  <SelectItem value="discussion">Discussion-based</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="additional_context">Additional Context (Optional)</Label>
              <Textarea
                id="additional_context"
                placeholder="Any specific requirements or focus areas..."
                value={lectureData.additional_context}
                onChange={(e) => handleChange('additional_context', e.target.value)}
                rows={3}
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Lecture'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateTopicModal;