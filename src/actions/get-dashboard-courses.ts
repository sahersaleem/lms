import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressandCategory = Course & {
  category: Category | null;
  chapters: {
    id: string;
  }[];
  userProgress: number | null;
};

interface CourseProps {
  course: CourseWithProgressandCategory[];
}
type DashboardCourses = {
  completedCourses: CourseWithProgressandCategory[];
  courseWithProgress:CourseWithProgressandCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchaseCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
      
    });


  const purchase = purchaseCourses.filter((purchase)=>purchase.course!==null)


  
  

  const courses = purchase.map((purchase) => purchase.course) as unknown as  CourseWithProgressandCategory[];
 
  
  for (let course of courses){
    const progress = await getProgress(userId , course.id)
    course["userProgress"]=progress
  }


  const completedCourses = courses.filter((course)=>course.userProgress===100)
  const courseWithProgress = courses.filter((course)=>(course.userProgress?? 0)<100)


  
  




  return {
    completedCourses,
    courseWithProgress
  }



  } catch (error: any) {
    console.log(error.message);
    return {
      completedCourses: [],
      courseWithProgress: [],
    };
  }
};
