import { Progress } from "@/components/ui/progress";
import React from "react";

interface CourseProgressProps {
  value: number;
}

const CourseProgress = ({ value }: CourseProgressProps) => {
  console.log(value);
  return (
    <div>
      <Progress value={value}/>
      <p className="text-green-600">{Math.round(value)}% complete</p>
    </div>
  );
};

export default CourseProgress;
