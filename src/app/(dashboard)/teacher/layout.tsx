import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TeacherNavbar from "./analytics/_components/TeacherNavbar";

const layout = async({ children }: { children: React.ReactNode }) => {
  const {userId } = await auth()
  if(!userId){
    redirect("/")
  }
  return (
    <div className="w-[100vw]  flex flex-row">
     
        <Sidebar />
   
      <div className="w-[100vw]">
       <TeacherNavbar/>
        
        {children}
      </div>
    </div>
  );
};

export default layout;
