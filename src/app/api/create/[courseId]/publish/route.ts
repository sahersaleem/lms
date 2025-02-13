import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }:{params:any}) {
  try {
    const courseId = params.courseId;
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

    const chapter = await db.course.update({
      where: {
        id:courseId
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json({ message: "course updated successfully" });
  } catch (error) {
    return NextResponse.json({message:"Error while updating data"})
  }
}
