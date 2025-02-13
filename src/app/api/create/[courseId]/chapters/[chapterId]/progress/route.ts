import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
{params}:{params:any}
) {
  try {
    
    const { isCompleted } = await request.json();
    console.log(isCompleted);
    
    const chapterId = (await params).chapterId

    const { userId } = await auth();

 
    const progress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: userId!,
          chapterId,
        },
      },
      update: {
        isCompleted:isCompleted,
      },
      create: {
        userId: userId!,
        chapterId,
        isCompleted:isCompleted,
      },
    });

    console.log(progress);
    
    return NextResponse.json({progress});
  } catch (error: any) {
    return NextResponse.json({ error: error!.message });
  }
}
