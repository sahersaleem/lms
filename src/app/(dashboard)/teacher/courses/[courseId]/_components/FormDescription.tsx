"use client";

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
import { courseDescriptionSchema, courseNameSchema } from "@/app/schemas/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { InitialData } from "./Image_Upload";


const FormDescriptionComp = ({ initialData, userId }: InitialData) => {
  const router = useRouter()
  type CourseName = z.infer<typeof courseDescriptionSchema>;
  const form = useForm<z.infer<typeof courseDescriptionSchema>>({
    resolver: zodResolver(courseDescriptionSchema),
    defaultValues: {
      description: initialData.description!,
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
      <div className="px-4 py-5 bg-gray-200 xs:max-w-[200px] lg:max-w-[450px] rounded-lg flex w-full justify-between flex-col mt-6">
        <h1 className="text-xl">Course Description</h1>

        {editing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g web development" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                onClick={handleSave}
                className="mt-4"
              >
                Save
              </button>
            </form>
          </Form>
        ) : (
          <div className="flex flex-row  justify-between mt-6">
            <p className={cn("xs:text-sm lg:text-lg tracking-wider capitalize " ,initialData.description === null && "italic text-sm" )}>{initialData.description || "no description"}</p>

            <button onClick={handleEdit} type="submit"><Edit/></button>
          </div>
        )}
      </div>
    </div>
  );
};
export default FormDescriptionComp;
