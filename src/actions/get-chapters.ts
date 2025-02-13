import { db } from "@/lib/db";
import { Attachments, Chapter } from "@prisma/client";

interface getChapterprops {
  userId: string;
  courseId: string;
  chapterId: string;
}

export async function getChapter({
  userId,
  courseId,
  chapterId,
}: getChapterprops) {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!course || !chapter) {
      throw new Error("course or chapter not found");
    }

    let muxData = null;
    let attachments: Attachments[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachments.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });



      const allChapters = await db.chapter.findMany({
        where:{
          courseId,
          isPublished:true
        }
      })
      console.log(allChapters.map((chapter)=>chapter.position));
      


    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      course,
      chapter,
      purchase,
      muxData,
      attachments,
      userProgress,
      nextChapter
    };
  } catch (error) {
    return {
      course: null,
      chapter: null,
      purchase: null,
      muxData: null,
      attachments: null,
      userProgress: null,
    };
  }
}
