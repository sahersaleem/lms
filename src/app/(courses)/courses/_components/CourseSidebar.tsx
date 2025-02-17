import { db } from "@/lib/db";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import CourseSidebarItem from "./CourseSidebarItemprops";
import CourseProgress from "./CourseProgress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = await auth();

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId!,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="h-4 border-r-2 p-8  min-h-[100vh]">
      <h1 className="text-xl font-fold ">{course.title}</h1>
      
        <div className="mt-5">
       <CourseProgress value={progressCount} />
       </div>
      
      { course && course.chapters.map((chapter) => (
        <CourseSidebarItem
          label={chapter.title}
          key={course.id}
          id={chapter.id}
          isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
          isLocked={!chapter.isFree && !purchase}
          courseId={course.id}
        />
      ))}
    </div>
  );
};

export default CourseSidebar;
