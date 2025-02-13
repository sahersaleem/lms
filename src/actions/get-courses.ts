import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressandCategory = Course & {
  category: Category | null;
  chapters: {
    id: string;
  }[];
  userProgress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export async function getCourses({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressandCategory[] | undefined> {
  try {
    const courses = await db.course.findMany({
      where: {
        userId,
        title: {
          contains: title,
        },
        categoryId,
        isPublished: true,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const courseWithProgress: CourseWithProgressandCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            console.log("purchase null");
            
            return {
              ...course,
              userProgress: null,
            };
          }

          const progressPercentage = await getProgress(userId, course.id);
          console.log(progressPercentage);
          
          
          return {
            ...course,
            userProgress: progressPercentage,
          };
        })
      );


      console.log(courseWithProgress);
      

    return courseWithProgress;
  } catch (error) {
    console.log("[GET COURSES ERROR]", error);
  }
}
