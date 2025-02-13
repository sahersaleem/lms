

import { db } from "@/lib/db";


export async function getProgress(userId:string,courseId:string):Promise<number>{


try {
    



// find id of all published chapter
const publishedChapters = await db.chapter.findMany({
    where:{
        courseId,
        isPublished:true
    },
    select:{
        id:true
    }
})




// map through all the published Chapter Ids
const publishedChaptersIds = publishedChapters.map((chapterId)=>chapterId.id)



// count user progress
const validateChapterIds = await db.userProgress.count({
    where:{
        userId,
        chapterId:{
            in:publishedChaptersIds
        },
        isCompleted:true
    }
})




// Calculate progress

const progressPercentage = (validateChapterIds/publishedChaptersIds.length)*100

return progressPercentage



} catch (error) {
    console.log("GET PROGREE ERRPOR",error)
    return 0
}









    
}