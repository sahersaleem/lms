import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const client = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_SECRET_KEY!,
});

export async function DELETE(request: NextRequest, { params }:{params:any}) {
  try {
    const chapterid = params.chapterId;
    const courseId = params.courseId;
    console.log(params);

    if (!chapterid && !courseId)
      throw new Error("chapter or course id does not exist.");

    const chapter = await db.chapter.delete({
      where: {
        courseId,
        id: chapterid,
      },
    });
    console.log(chapter);

    if (!chapter) {
      return NextResponse.json({
        message: "Error occurred while deleting chapter",
      });
    }

    const chapterPublished = await db.chapter.findMany({
      where: {
        id: params.chapterId,
        isPublished: true,
      },
    });

    if (!chapterPublished) {
      await db.course.update({
        where: {
          id: params.chapterId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    const existingmuxData = await db.muxData.findMany({
      where: {
        id: chapterid,
      },
    });

    if (existingmuxData) {
      await db.muxData.delete({
        where: {
          id: existingmuxData[0].assesId,
          chapterId: chapterid,
        },
      });

      return NextResponse.json({ message: "Mux data deleted successullu" });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error ocuured while deleting chaoter",
    });
  }
}

export async function PATCH(req: Request, { params }:{params:any}) {
  try {
    console.log(params);

    const request = await req.json();
    const id = params.chapterId;

    if (!id) return NextResponse.json({ error: "Id does not exist" });

    const chapter = await db.chapter.update({
      where: {
        id: id,
      },

      data: {
        title: request.title,
        description: request.description,
        isFree: request.access,
        videoUrl: request.videoUrl,
      },
    });

    if (request.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          id,
        },
      });

      if (existingMuxData?.assesId) {
        await client.video.assets.delete(existingMuxData.assesId);

        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
            chapterId: id,
          },
        });
      }

      const asset = await client.video.assets.create({
        input: request.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: id,
          assesId: asset.id,
          playBackId: asset.playback_ids?.[0].id,
        },
      });
    }

    console.log("chapter update successfully", chapter);

    return NextResponse.json({
      message: "Chapter updated successfully",
      chapter,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
