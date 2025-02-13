"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { courseNameSchema } from "@/app/schemas/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface InitialData {
  initialData: {
    title: string;
    id: string;
  };
  userId: string;
}

const EditForm = ({ initialData, userId }: InitialData) => {
  const router = useRouter()
  type CourseName = z.infer<typeof courseNameSchema>;
  const form = useForm<z.infer<typeof courseNameSchema>>({
    resolver: zodResolver(courseNameSchema),
    defaultValues: {
      name: initialData.title,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const [editing, setEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (data: any) => {
    try {
      console.log(data);
      const res = await axios.patch(`/api/create/${initialData.id}`, data);
      setEditing(false)
      router.refresh()
      
      if (res) {
        console.log(res);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
   
      <div className="px-4 py-5 bg-gray-200 xs:max-w-[300px] lg:max-w-[450px] rounded-lg flex w-full justify-between flex-col mt-6">
        <h1 className="text-xl">Course Title</h1>

        {editing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g web development" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                onClick={handleSave}
                className="mt-4"
              >
                Save
              </Button>
            </form>
          </Form>
        ) : (
          <div className="flex xs:flex-col lg:flex-row  justify-between mt-6 xs:gap-y-4 lg:gap-y-0">
            <p className="xs:text-sm lg:text-lg tracking-wider capitalize ">{initialData.title}</p>

            <Button onClick={handleEdit} type="submit" className="xs:w-1/2 lg:w-auto" >Edit</Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default EditForm;
