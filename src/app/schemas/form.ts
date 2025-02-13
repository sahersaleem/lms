import {z} from 'zod'


export const  courseNameSchema = z.object({
    name:z.string().min(2).max(100)
})

export const  courseDescriptionSchema = z.object({
    description:z.string().min(2).max(100)
})

export const  CourseImageSchema = z.object({
    imageUrl:z.string().min(2).max(100)
})

export const  categorySchema = z.object({
    categoryId:z.string()
})

export const coursePriceSchema=z.object({
    price:z.coerce.number()
})

export const courseAttachmentSchema = z.object({
    url:z.string().min(1)
})


export const chapterTitleSchema = z.object({
    title:z.string().min(2)
})


export const chapterAccessSchema = z.object({
    access:z.boolean().default(false)
})

export const chapterVideoUrl = z.object({
    videoUrl:z.string().min(2).max(200)
})