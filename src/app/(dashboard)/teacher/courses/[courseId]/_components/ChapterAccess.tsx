"use client";
import { chapterAccessSchema } from "@/app/schemas/form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { IChapters } from "./ChapterTitle";
import { Checkbox } from "@/components/ui/checkbox";

const ChapterAceess = ({ chapter, courseid }: IChapters) => {
  const [edit, setEditing] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof chapterAccessSchema>>({
    resolver: zodResolver(chapterAccessSchema),
    defaultValues: {
      access: Boolean(chapter.isFree),
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

      console.log("data send succcessfully");
      router.refresh();
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
      {!chapter.isFree ? (
        <div className="flex justify-between items-center">
          {" "}
          <p className="text-gray-500 italic mt-2">
            This chapter is paid.
          </p>{" "}
          <FaPencil onClick={toggleEditing} />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          {" "}
          <p className="text-gray-500 italic mt-2">
            This chapter is free for preview.
          </p>{" "}
          <FaPencil onClick={toggleEditing} />
        </div>
      )}

      {edit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveChapterTitle)}>
            <FormField
              control={form.control}
              name="access"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  /></FormControl>
                  <FormDescription>
                    Mark the chapter free or paid
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="mt-4"
            >
              Save
            </button>
          </form>
        </Form>
      ) : (
        ""
      )}

      <div className="mt-5">
        <span>
          Click to <FaPencil className="inline" /> to change access settings.
        </span>
      </div>
    </div>
  );
};

export default ChapterAceess;
