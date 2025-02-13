import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getChapter } from "@/actions/get-chapters";
import { redirect } from "next/navigation";
import Banner from "@/app/(dashboard)/teacher/courses/[courseId]/_components/Banner";
import VideoPlayer from "./_components/VideoPlayer";
const page = async ({
  params,
}: {
  params: Promise<{ courseId: string; id: string }>;
}) => {
  const { userId } = await auth();
  const courseid = (await params).courseId;
  const id = (await params).id;

  const {
    nextChapter,
    course,
    chapter,
    purchase,
    muxData,
    attachments,
    userProgress,
  } = await getChapter({ courseId: courseid!, chapterId: id, userId: userId! });

  if (!chapter || !course) {
    return redirect("/");
  }

  const lockedChapter = !chapter.isFree && !purchase;
  const completedOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant={"success"} label="You already complete this course" />
      )}

      {lockedChapter && (
        <Banner variant={"warning"} label="You need to unlock the chapter" />
      )}

      <VideoPlayer
        chapterId={id}
        isLocked={lockedChapter}
        completedOnEnd={completedOnEnd}
        nextChapterId={nextChapter?.id!}
        playBackId={muxData?.playBackId!}
        courseId={courseid}
        title={chapter.title}
        price={course.price!}
        description={chapter.description!}
        isCompleted={!!userProgress?.isCompleted}
      />
    </div>
  );
};

export default page;
