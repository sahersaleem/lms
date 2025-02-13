import { db } from "@/lib/db";
import Mux from "@mux/mux-node";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";

const client = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_SECRET_KEY!,
});
export async function PATCH(req: Request, { params }:{params:any}) {
  try {
    console.log(params);

    const request = await req.json();
    const id = params.courseId;

    if (!id) return NextResponse.json({ error: "Id does not exist" });

    const updatedTitle = await db.course.update({
      where: {
        id: id,
      },

      data: {
        title: request.name,
        description: request.description,
        imageUrl: request.imageUrl,
        categoryId: request.categoryId,
        price: request.price,
      },
    });

    console.log("course update successfully", updatedTitle);

    return NextResponse.json({
      message: "Course titlr updated successfully",
      updatedTitle,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(request: Request, { params }:{params:any}) {
  try {
    console.log(params);
    const id = params.courseId;
    const chapterId = params.chapterId;

    if (!id) throw new Error("id does not exist");

    const deleteChapter = await db.course.delete({
      where: {
        id,
      },
    });

    const existingMuxData = await db.muxData.findMany({
      where: {
        id,
      },
    });

    if (existingMuxData) {
      await db.muxData.delete({
        where: {
          id: existingMuxData[0].assesId,
          chapterId,
        },
      });
    }

    if (!deleteChapter)
      return NextResponse.json({ message: "NOT FOUND", status: 404 });

    return NextResponse.json({
      message: "Course deleted succesfully",
      status: 200,
    });
  } catch (error) {


    return NextResponse.json({message:"error ocurred while deleting course"})
  }
}
