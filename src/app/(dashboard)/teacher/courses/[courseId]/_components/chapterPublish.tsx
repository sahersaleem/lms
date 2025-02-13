"use client";

import { Chapter } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IChapter {
  chapter: Chapter;
  courseId: string;
}
const ChapterPublish = ({ chapter, courseId }: IChapter) => {
  console.log(chapter.id)
  console.log(courseId)
  const router = useRouter()
  const handleClick = async () => {
    try {
      if (!chapter.isPublished) {
        console.log(chapter.isPublished)
        const res = await axios.patch(
          `/api/create/${courseId}/chapters/${chapter.id}/publish`
        );

        console.log("chapter publish sucessfully");
      } else {
        const res = await axios.patch(
          `/api/create/${courseId}/chapters/${chapter.id}/unpublish`
        );
        console.log("chapter unpublish successfully!");
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
        {chapter.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  );
};

export default ChapterPublish;
