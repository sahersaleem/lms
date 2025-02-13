import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/Categories";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import CourseList from "./_components/Course";

interface searchParamsProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Page = async ({ searchParams }: searchParamsProps) => {
  const { userId } = await auth();

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId: userId!,
    ...searchParams,
  });

  console.log(courses);

  return (
    <div className="">
      <Categories item={categories} />
      {courses && <CourseList course={courses} />}
    </div>
  );
};

export default Page;
