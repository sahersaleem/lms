"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { courseNameSchema } from "@/app/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";

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

const Page = () => {

  type CourseName = z.infer<typeof courseNameSchema>;
  const form = useForm<z.infer<typeof courseNameSchema>>({
    resolver: zodResolver(courseNameSchema),
    defaultValues: {
      name: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter()


  const onSubmitForm = async (data: CourseName) => {
    console.log(data)
    try {
    const res:any =  await axios.post("/api/create", {
        data,
      });
    if(res){
      router.push(`/teacher/courses/${res?.data?.id}`)
    }
      
      


        
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 w-full flex justify-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="max-w-3xl space-y-5"
        >
          <h1 className="xs:text-3xl lg:text-5xl text-center mb-6 font-bold">Name your course!</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g web development" {...field} />
                </FormControl>
                <FormDescription>
                  What will you teah in this course !
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
