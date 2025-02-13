import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";



const groupByCourse = (purchases: any[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;

    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }

    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchase = await db.purchase.findMany({
      where: {
        course: {
          userId,
        },
      },
      include: {
        course: true,
      },
    });




    
    
    const groupedEarning = groupByCourse(purchase)
    
    
    
    const data = Object.entries(groupedEarning).map(([courseTitle , price])=>({
     name:courseTitle,
     total:price
    }))
   
    
    const totalReveniew = data.reduce((acc , curr)=>acc + curr.total , 0)
    const totalSales = purchase.length
    return {
        data,
        totalReveniew,
        totalSales
    }
  } catch (error) {
      return {
        data:[],
        totalReveniew:0,
        totalSales:0

      }
  }
};
