import React from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import EditForm from "./_components/EditForm";
import FormDescriptionComp from "./_components/FormDescription";
import Upload from "./_components/Upload";
import ImageUpload from "./_components/Image_Upload";
import Category from "./_components/Categories";
import Price from "./_components/Price";
import AttachmentsComp from "./_components/Attachments";
import Chapters from "./_components/Chapters";
import ChaptersComp from "./_components/Chapters";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa6";
import DeleteCourse from "./_components/DeleteCourse";
import CoursePublish from "./_components/CoursePublish";
import Banner from "./_components/Banner";
export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const courseId = (await params).courseId;
  console.log(courseId);

  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Get data from database according to id
  const coursedata = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        orderBy: {
          createdAt: "desc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categoryData = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  console.log(categoryData);
  if (!coursedata) {
    redirect("/");
  }

  const title = coursedata?.title;
  const description = coursedata?.description;
  const price = coursedata?.price;
  const imageUrl = coursedata?.imageUrl;
  const attachments = coursedata.attachments;
  const chapters = coursedata.chapters;
  const completedFields = [
    title,
    description,
    price,
    imageUrl,
    attachments,
    chapters,
  ];

  const requiredFields = completedFields.length;
  const filterCompletedFields = completedFields.filter(Boolean).length;

  return (
    <div className="w-full h-screen  lg:px-10">
       {!coursedata.isPublished && (
        <Banner
          label="This course is not published this won't visible to your students"
          variant={"warning"}
        />
      )}
      <div className="flex lg:gap-x-4 items-center xs:flex-col lg:flex-row xs:px-4">
        <div className="mt-24 w-full">
       
          <h1 className="text-4xl lg:text-center font-bold">Course Setup!</h1>
          <p className="text-xl lg:text-center mt-2 tracking-wider">
            {" "}
            Complete all field : ( {requiredFields} / {filterCompletedFields})
          </p>
        </div>{" "}
        <div className="flex gap-x-4 lg:items-center xs:items-center xs:justify-center xs:mt-10 lg:mt-0">
          <CoursePublish course={coursedata} courseId={coursedata.id} />
          <DeleteCourse courseId={coursedata.id} />
        </div>{" "}
      </div>

      <div className="xs:px-4">
        <h1 className="xs:text-xl lg:text-4xl mt-10 capitalize tracking-wider mb-10">
          Customize your course!
        </h1>
        <div className="flex gap-x-10 w-full xs:flex-col lg:flex-row">
          <div className="flex flex-col gap-y-4">
            <EditForm initialData={coursedata} userId={userId} />
            <FormDescriptionComp initialData={coursedata} userId={userId} />
            <ImageUpload initialData={coursedata} userId={userId} />
            <Category
              initialData={coursedata}
              userId={userId}
              options={categoryData.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>
          <div className="flex flex-col gap-y-6">
            <Price initialData={coursedata} userId={userId} />
            <AttachmentsComp initialData={coursedata} userId={userId} />
          </div>
          <div>
            <ChaptersComp initialData={coursedata} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
