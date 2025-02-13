import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }:{params:any}) {
  try {
    const courseId = params.courseId;
    const chapterId = params.chapterId;
    const { userId } = await auth();

    const courseOwner = await db.course.findFirst({
      where: {
        id: courseId,
        userId: userId!,
      },
    });

    if (!courseOwner) {
      return NextResponse.json({ message: "Unauthorized access", status: 404 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json({ message: "chapter updated successfully" });
  } catch (error) {
    return NextResponse.json({message:"Error while updating data"})
  }
}
