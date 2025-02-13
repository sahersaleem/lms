import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { DataTable } from "./_components/data_table";
import { columns} from "./_components/columns";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


const page = async () => {
  const {userId} = await auth()

  if(!userId){
    return null
  }
  const data = await db.course.findMany({
    where:{
      userId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  return (
    <div className="w-full mt-8 flex items-center flex-col justify-center  ">
      <h1 className="text-4xl text-center">Courses</h1>
      {/* <Link href={'/teacher/courses/create'}><Button className='mt-8' >Create Courses</Button></Link>
       */}
       <div className="w-full">   <DataTable columns={columns} data={data}/></div>
   
    </div>
  );
};

export default page;
