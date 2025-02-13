import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CourseList from "../browse/_components/Course";
import InfoCard from "./components/InfoCard";
import { CheckCircle, Clock } from "lucide-react";
const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const { completedCourses, courseWithProgress } = await getDashboardCourses(
    userId
  );

  console.log(completedCourses, courseWithProgress);
  return (
    <div className="text-black w-full h-screen">
      <h1 className="text-center text-2xl mt-10 leading-10">
        Your Enrolled Courses!
      </h1>
      <div className="flex justify-between items-center lg:px-10 gap-x-6 xs:flex-col lg:flex-row" >
        <InfoCard
          label="In Progress"
          noOfItem={courseWithProgress.length}
          icon={Clock}
        />
        <InfoCard
          label="Completed Course"
          noOfItem={completedCourses.length}
          icon={CheckCircle}
        />
      </div>

      <CourseList course={[...completedCourses ,...courseWithProgress ]} />
      {!completedCourses && !courseWithProgress && (
        <div className="flex justify-center items-center  overflow-x-hidden mt-20">
          <h1 className="text-xl ">
            No courses purchase yet . Go to browse section
          </h1>
        </div>
      )}
    </div>
  );
};

export default page;
