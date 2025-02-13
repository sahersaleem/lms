"use client";
import React, { useState } from "react";
import { IChapters } from "./ChapterTitle";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { courseDescriptionSchema } from "@/app/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaPencil } from "react-icons/fa6";

const ChapterDescription = ({ chapter, courseid }: IChapters) => {
  const [editing, setEditing] = useState<boolean>(false);
  const router = useRouter();

  const toogleEdit = () => {
    setEditing(true);
  };

  const form = useForm<z.infer<typeof courseDescriptionSchema>>({
    resolver: zodResolver(courseDescriptionSchema),
    defaultValues: {
      description: chapter.description!,
    },
  });

  const handleSave = async (data: any) => {
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

  return (
    <div className="bg-slate-100 shadow-lg xs:w-[200px] lg:max-w-[400px] p-4 mt-4">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-lg tracking-wide mb-4">Chapter Description</h1>
      </div>

      {!chapter.description ? (
        <div className="flex justify-between items-center">
          <p className="text-gray-400 italic mt-2">No description</p>{" "}
          <button onClick={toogleEdit} type="button">
            <Plus />
          </button>
        </div>
      ) : (
        <div className="flex justify-between">
          <p dangerouslySetInnerHTML={{ __html: chapter.description }} className="xs:text-sm lg:text-xl"/>{" "}
          <button onClick={toogleEdit} type="button">
            <FaPencil />
          </button>
        </div>
      )}

      {editing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)}>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <ReactQuill {...field} theme="snow" />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="mt-4">
              submit
            </Button>
          </form>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChapterDescription;
