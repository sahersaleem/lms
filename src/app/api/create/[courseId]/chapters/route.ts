import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }:{params:any}) {
  const { userId } = await auth();
  const { name } = await request.json();
  console.log(name);

  const id = await params.courseId;
  console.log(id);

  if (!id) throw new Error("course Id is not found");
  if (!userId) throw new Error("id not found");



const lastChapter = await db.chapter.findFirst({
  where:{
    courseId:id,
    
  },
  orderBy:{
    position:"desc"
  }
})


const newPosition = lastChapter ? lastChapter.position+1:1

  const chapters = await db.chapter.create({
    data: {
      courseId: id,
      title: name,
      position:newPosition
    },
  });

  if (chapters) {
    return NextResponse.json(chapters);
  }

  return NextResponse.json("dgvdv");
}



 
export async function GET(request:NextRequest ,{ params }:{params:any}) {
    
   const {userId} = await auth()
  
    const id = await params.courseId;
    console.log(id);
  
    if (!id) throw new Error("course Id is not found");
    if (!userId) throw new Error("id not found");
  
    const chapters = await db.chapter.findMany({
      where:{
        courseId:id
      }
    });
  
    if (chapters) {
      return NextResponse.json(chapters);
    }
  
    return NextResponse.json("dgvdv");




}