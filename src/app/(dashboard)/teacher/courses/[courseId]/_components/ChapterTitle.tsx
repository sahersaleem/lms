"use client";
import { chapterTitleSchema } from "@/app/schemas/form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPencil } from "react-icons/fa6";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface IChapters {
  chapter: Chapter;
  courseid: string;
}

const ChapterTitle = ({ chapter, courseid }: IChapters) => {
  const [edit, setEditing] = useState<boolean>(false);


const router = useRouter()
  const form = useForm<z.infer<typeof chapterTitleSchema>>({
    resolver: zodResolver(chapterTitleSchema),
    defaultValues: {
      title: chapter.title,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSaveChapterTitle = async (data: any) => {
    console.log(data);

    try {
      const res = await axios.patch(
        `/api/create/${courseid}/chapters/${chapter.id}`,
        data
      );

      console.log("data send succcessfully")
      router.refresh()
      setEditing(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const toggleEditing = () => {
    setEditing(true);
  };

  return (
    <div className="bg-slate-100 shadow-lg xs:max-w-[200px] lg:max-w-[400px] p-4 mt-4">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-lg tracking-wide"> Edit Chapter title here</h1>{" "}
        <FaPencil onClick={toggleEditing} />
      </div>

      {edit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveChapterTitle)}>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input placeholder="Enter course name" {...field} />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="mt-4">save</Button>
          </form>
        </Form>
      ) : (
        <h2 className="mt-4 xs:text-xl lg:text-3xl font-medium">{chapter.title}</h2>
      )}
    </div>
  );
};

export default ChapterTitle;
