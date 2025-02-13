import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE( request:Request , { params }:{params:any}) {
  try {
    const id = params?.id;

    console.log(id);
    

    const { userId } = await auth();

    if (!id) throw new Error("id not found");

    if (!userId) throw new Error("Unauthorized user");

    const deleteAttachments = await db.attachments.delete({
      where: {
        id,
      },
    });

    if (!deleteAttachments)
      throw new Error("Error ocurred while deleting attachments");

    return NextResponse.json({ deleteAttachments });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ status: 500 });
  }
}
