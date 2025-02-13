"use client";

import React, { useEffect, useState } from "react";
import { Chapter, Course } from "@prisma/client";
import { courseNameSchema } from "@/app/schemas/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

// interface IChapter
interface IChapters {
  initialData: Course & { chapters: Chapter[] };
  userId: string;
}

const ChaptersComp = ({ initialData, userId }: IChapters) => {
  const [updating, setUpdating] = useState<boolean>(false);
  const [chaptersData, setChaptersData] = useState<Chapter[]>([]);

  const router = useRouter();
  // use form hook
  const form = useForm<z.infer<typeof courseNameSchema>>({
    resolver: zodResolver(courseNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    const getAllChapters = async () => {
      try {
        const res:any = await axios.get(`/api/create/${initialData.id}/chapters`);
        setChaptersData(res.data);

        console.log(chaptersData);
      } catch (error: any) {
        console.log("error ocurred while creating chapters");
      }
    };
    getAllChapters();
  }, []);

  const handleSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await axios.post(
        `/api/create/${initialData.id}/chapters`,
        data
      );

      setUpdating(false);
      router.refresh();
    } catch (error: any) {
      console.log("error ocurred while creating chapters");
    }
  };

  const toggleButton = () => {
    setUpdating(true);
  };

  return (
    <div>
      <h1 className="text-2xl xs:mt-10 lg:mt-0 ">Course Chapters!</h1>
      <div className="px-8 py-5 bg-gray-200  xs:max-w-[200px] lg:max-w-[450px] rounded-lg flex justify-between flex-col mt-6 gap-3 w-[400px]">
        {chaptersData.length === 0 && (
          <div>
            <p>No chapters available for this course</p>
          </div>
        )}

        {chaptersData.map((item) => (
          <div
            key={item.id}
            className="flex bg-purple-300 rounded-lg px-2 items-center justify-center gap-x-6 gap-y-4"
          >
            <p>{item.title} </p>{" "}
            <Link href={`/teacher/courses/${initialData.id}/${item.id}`}>
              <Pencil size={10} />
            </Link>{" "}
          </div>
        ))}
        <div className="mt-4 flex justify-around items-center">
          <span className="text-lg font-semibold">Create chapters </span>{" "}
          <button onClick={toggleButton} type="button">
            <FaPlus />
          </button>
        </div>

        {updating && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapters Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit">
                <FaPlus />
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ChaptersComp;
