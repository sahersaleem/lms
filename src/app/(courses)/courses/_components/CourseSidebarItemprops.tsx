'use client'

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface CourseSidebarItemprops {
  label: string;
  id: string;
  isCompleted: boolean;
  isLocked: boolean | null;
  courseId: string;
}

const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  isLocked,
  courseId,
}: CourseSidebarItemprops) => {

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const pathName = usePathname()
  const router = useRouter()

  const isActive = pathName.includes(id)
const onClick = ()=>{
router.push(`/courses/${courseId}/${id}`)
  
}
  return (
    <button type="button" className={cn(
    "text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-400 transition-all duration-300 w-full flex items-center justify-self-center mt-10" , isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-600/10 border-r-4 border-black" , isCompleted && "text-emerald-500 bg-emerald-100 " , isCompleted && isActive && "bg-emerald-200/20"
    )} onClick={onClick}>
        <div className="flex gap-x-4 items-center">
            <Icon className={cn(
                 "text-slate-500" , isActive && "text-slate-700", isCompleted && "text-emerald-700"
            )}/>
        {label}
        </div>
    

       
    </button>
  )
};

export default CourseSidebarItem;
