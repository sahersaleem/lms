
'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";

interface CourseProgressbtnProps {
  courseId: string;
  nextChapterId?: string;
  chapterId: string;
  isCompleted: boolean;
}

const CourseProgressbtn = ({
  courseId,
  nextChapterId,
  chapterId,
  isCompleted,
}: CourseProgressbtnProps) => {
  const router = useRouter();
  console.log(isCompleted , "isCompleted")
  const onClick = async () => {
    try {

      const response = await axios.put(
        `/api/create/${courseId}/chapters/${chapterId}/progress`, {isCompleted:!isCompleted}
      );
      
    } catch (error: any) {
   
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button variant={isCompleted ? "success" : "outline"} onClick={onClick}>
        {isCompleted ? "Mark as uncomplete" : "Mark as Completed"}
      </Button>
    </div>
  );
};

export default CourseProgressbtn;
