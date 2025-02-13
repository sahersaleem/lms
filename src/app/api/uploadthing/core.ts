import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async ()=>{
    const {userId} = await auth()
    if(!userId) throw new Error('unauthorized access')
    return {userId}
}



export const ourFileRouter = {
courseImage:f({image:{maxFileSize:"4MB"}}).middleware(()=>handleAuth()).onUploadComplete(()=>{}),
courseAttachments:f(['text' , 'image' , 'video', 'audio' , 'pdf']).middleware(()=>handleAuth()).onUploadComplete(()=>{}),
chapterVideo:f({video:{maxFileCount:1,maxFileSize:"512GB"}}).middleware(()=>handleAuth()).onUploadComplete(()=>{}),



  
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
