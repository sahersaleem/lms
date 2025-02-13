import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }:{params:any}) {
  try {
    const { userId } = await auth();
    const { url } = await request.json();
    const id = params.courseId;
    console.log(id);
    
    console.log(id);

    if (!userId) throw new Error("Unauthorized Error");

    const owner = await db.course.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!owner) throw new Error("Unauthorized Owner");

    const attachments = await db.attachments.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: id,
      },
    });

    if (!attachments) {
      return new NextResponse("Error occurred while creating attachmenst");
    }

    return new NextResponse("Attachments created successfully", attachments);
  } catch (error) {
    return new NextResponse("ATTACHMENTS ERROR OCURRED", { status: 500 });
  }
}
