import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CourseSidebarItem from "./CourseSidebarItemprops";
import { Course, Chapter, UserProgress } from "@prisma/client";
import { db } from "@/lib/db";


import React from "react";
import { FaBars } from "react-icons/fa";
import CourseProgress from "./CourseProgress";
import { auth } from "@clerk/nextjs/server";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
 

const MobileCourseSidebar =async ({ course, progressCount }: CourseSidebarProps) => {
  const {userId} = await auth()
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId!,
        courseId: course.id,
      },
    },
  });
  return (
    <Sheet>
      <SheetTrigger>
        <FaBars />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <h1 className="text-xl font-fold ">{course.title}</h1>

          <div className="mt-5">
            <CourseProgress value={progressCount} />
          </div>
          <SheetDescription>
            {course &&
              course.chapters.map((chapter) => (
                <CourseSidebarItem
                  label={chapter.title}
                  key={course.id}
                  id={chapter.id}
                  isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                  isLocked={!chapter.isFree && !purchase}
                  courseId={course.id}
                />
              ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileCourseSidebar;
