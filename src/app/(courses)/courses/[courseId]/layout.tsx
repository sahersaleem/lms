import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getProgress } from "@/actions/get-progress";
import CourseSidebar from "../_components/CourseSidebar";
import ChapterNavbar from "../_components/ChapterNavbar";
import MobileCourseSidebar from "../_components/MobileCourseSidebar";

const page = async ({
  params,
  children,
}: {
  params: Promise<{ courseId: string }>;
  children: React.ReactNode;
}) => {
  const { userId } = await auth();

  const courseId = (await params).courseId;

  const findCourse = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: userId!,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const progressCount = await getProgress(userId!, courseId);
  return (
    <div className="w-[100vw] flex">
      {findCourse && (
        <>
          <div className="xs:hidden lg:block">
            <CourseSidebar course={findCourse} progressCount={progressCount} />
          </div>

          <div className="xs:block lg:hidden mt-10 ml-10">
            <MobileCourseSidebar
              course={findCourse}
              progressCount={progressCount}
            />
          </div>
        </>
      )}

      <main className="w-[100vw]">
        <ChapterNavbar />
        {children}
      </main>
    </div>
  );
};

export default page;
