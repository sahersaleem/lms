
export const isTeacher = (userId:string)=>{
    return userId===process.env.NEXT_PUBLIC_TEACHER_ID
}