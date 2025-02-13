import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const request = await req.json();
    const {name} = request.data
  
    


    if (!userId) {
      return NextResponse.json("unauthorized user", { status: 401 });
    }

    const course = await db.course.create({
      data: { userId, title:name , description:null , price:null},
    });

    console.log(course);
    
    return NextResponse.json(course);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({message:"Error ocurred"});
  }
}
