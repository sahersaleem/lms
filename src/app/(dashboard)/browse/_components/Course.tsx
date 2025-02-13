import React from "react";
import { Course, Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { BookCopy } from "lucide-react";
import CourseProgress from "@/app/(courses)/courses/_components/CourseProgress";

type CourseWithProgressandCategory = Course & {
  category: Category | null;
  chapters: {
    id: string;
  }[];
  userProgress: number | null;
};

interface CourseProps {
  course: CourseWithProgressandCategory[];
}

const CourseList = ({ course }: CourseProps) => {
  console.log(course)
  return (
    <div className="w-full  xs:p-6 lg:p-10">
      <h1 className="text-center xs:text-xl lg:text-xl mb-8">Course List</h1>
      <div className="w-full flex flex-wrap gap-6">
        {course &&
          course.map((course) => (
            <div key={course.id} className="space-y-2 ">
              {course.imageUrl && (
                <Image
                  src={course.imageUrl}
                  width={300}
                  height={300}
                  alt="course-image"
                  className="xs:w-[250px] lg:w-[300px]"
                />
              )}
              <Link className="xs:text-sm lg:text-xl font-bold mt-4" href={`/courses/${course.id}`}>{course.title}</Link>
              <p className="text-slate-400 text-sm font-light capitalize">{course.category?.name}</p>
             
              <div className="flex items-center gap-x-4"><BookCopy className="inline-block text-blue-400"/>   <span>{course.chapters.length} {course.chapters.length===1?"chapter":"chapters"}</span></div>
              <p className="font-bold text-sm">Price : ${course.price||0}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseList;
