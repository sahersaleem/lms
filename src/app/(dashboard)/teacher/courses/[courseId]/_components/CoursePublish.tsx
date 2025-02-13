"use client";

import { Course } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface IChapter {
  course: Course;
  courseId: string;
}
const CoursePublish = ({ course, courseId }: IChapter) => {

  const confetti = useConfettiStore()

  const router = useRouter()
  const handleClick = async () => {
    try {
      if (!course.isPublished) {
        const res = await axios.patch(
          `/api/create/${courseId}/publish`
        );
      router.refresh()
        confetti.onOpen()
      } else {
        const res = await axios.patch(
          `/api/create/${courseId}/unpublish`
        );
      console.log("unpublish succes")
       router.refresh()


      }
    } catch (error:any) {
      console.log("error ocurring while publish or unnpublishing data", error.message);
    }
  };

  return (
    <div>
      <Button
        className="bg-white hover:bg-white text-black"
        onClick={handleClick}
      >
        {course.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  );
};

export default CoursePublish;
