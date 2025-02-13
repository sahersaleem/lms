
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import ChapterTitle from "../_components/ChapterTitle";
import ChapterDescription from "../_components/ChapterDescription";
import ChapterAceess from "../_components/ChapterAccess";
import { FaEye, FaEyeSlash, FaRegArrowAltCircleLeft, FaVideo } from "react-icons/fa";
import VideoUpload from "../_components/Video_Upload";
import Banner from "../_components/Banner";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from "react-icons/fa6";
import DeleteChapter from "../_components/DeleteChapter";
import axios from "axios";
import ChapterPublish from "../_components/chapterPublish";
import Link from "next/link";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; courseId: string }>;
}) => {
  console.log((await params).id);

  const id = (await params).id;
  const courseid = (await params).courseId;

  if (!id) throw new Error("id does not exist");

  const findChapters = await db.chapter.findUnique({
    where: {
      id: id,
      courseId: courseid,
    },
  });

  if (!findChapters) redirect("/");



  return (
    <>
      {!findChapters.isPublished && (
        <Banner
          label="This chapter is not published this won't visible in the course"
          variant={"warning"}
        />
      )}
      <div><Link href={`/teacher/courses/${courseid}`} className="flex gap-x-4 items-center p-4"><FaRegArrowAltCircleLeft/><span>Back to course</span></Link></div>
      <div className="w-full mt-10 xs:px-4 lg:px-10 ">
        <div className="flex justify-between xs:flex-col lg:flex-row">
          {" "}
          <h1 className="xs:text-lg lg:text-2xl font-bold tracking-wider">
            Customize chapter "{findChapters.title}"
          </h1>
          <div className="flex gap-x-4 items-center justify-around flex-row xs:mt-4 lg:mt-0">
            {" "}
            <ChapterPublish chapter={findChapters} courseId={courseid}/>
            <DeleteChapter courseId={courseid} chapterId={id} />
          </div>
        </div>

        <div className="flex justify-around items-center xs:flex-col lg:flex-row">
          <div>
            <ChapterTitle chapter={findChapters} courseid={courseid} />
            <ChapterDescription chapter={findChapters} courseid={courseid} />
            <div className=" mt-10 ">
              <div className=" px-2 flex items-center gap-x-2">
                <FaEye size={20} className="" />
                <span className="xs:text-sm lg:text-2xl tracking-wider">
                  Access Settings
                </span>{" "}
              </div>
              <ChapterAceess chapter={findChapters} courseid={courseid} />
            </div>
          </div>
          <div className=" ">
            <div className=" px-2 flex items-center gap-x-2 xs:mt-8 lg:mt-0">
              <FaVideo size={20} className="" />
              <span className="xs:text-sm lg:text-2xl tracking-wider">
                Upload Chapter Video
              </span>{" "}
            </div>
            <VideoUpload chapter={findChapters} courseid={courseid} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
