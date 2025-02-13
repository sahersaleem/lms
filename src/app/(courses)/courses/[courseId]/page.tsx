import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const id = (await params).courseId;

  const course = await db.course.findUnique({
    where: {
      id,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });


if(!course){
  redirect('/')
}
else{
  redirect(`/courses/${course.id}/${course.chapters[0].id}`)
}

 









  return <div></div>
};

export default page;
