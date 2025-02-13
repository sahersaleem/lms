"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { FaChartBar } from "react-icons/fa6";
import { FaCompass } from "react-icons/fa";
import  {MdOutlineDashboard} from "react-icons/md"

import Link from "next/link";
import { cn } from "@/lib/utils";
const Sidebar = () => {
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const path = usePathname();

  const studentRoutes = [
    {
      href: "/dashboard",
      name: "Dashboard",
      Icon:MdOutlineDashboard
    },

    {
      href: "/browse",
      name: "Browse",
      Icon:FaCompass
      
    },
  ];

  const teacherRoutes = [
    {
      href: "/teacher/courses",
      name: "courses",
      Icon:GraduationCap

    },
    {
      href: "/teacher/analytics",
      name: "Analytics",
      Icon:FaChartBar
    },

  
  ];

  const routes = path.startsWith("/teacher") ? teacherRoutes : studentRoutes;
  return (
    <div className={`bg-white w-[50%] lg:w-[20%] h-full min-h-[100vh] z-40 border border-black/10 shadow px-5 py-4 xs:max-w-[20%] `}>
      <div className="flex justify-between items-center">
        {" "}
        <Image src={"/images/logo.jpg"} width={80} height={100} alt="logo"  className="w-[80px]"/>
        <span className="text-2xl ">
          {" "}
          <FaBars onClick={()=>setIsOpen(!isOpen)} className="xs:hidden lg:inline-block" />
        </span>
      </div>
      <div className=" flex flex-col gap-y-4 xs:mt-20 lg:mt-10 ">
        {routes.map(({name , Icon , href}, index) => (
          <Link
            key={index}
            href={href}
            className={`hover:bg-blue-200 flex gap-x-3 items-center justify-around rounded-sm ${
              path ==href
                ? "bg-blue-100 border-r-4 border-blue-600 py-2 rounded-sm text-black"
                : ""
            } text-black text-lg py-2 px-2 transition-all duration-200 ease-in-out `}
          >
           <Icon className=""/> <span className={`${isOpen?"xs:hidden lg:inline-block" :"hidden lg:inline-block"}`}>{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
