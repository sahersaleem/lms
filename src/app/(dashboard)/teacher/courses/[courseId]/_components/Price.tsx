

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
import { coursePriceSchema } from "@/app/schemas/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { InitialData } from "./Image_Upload";
import { Button } from "@/components/ui/button";


const Price = ({ initialData, userId }: InitialData) => {
  console.log(initialData)
  const router = useRouter()

  type CourseName = z.infer<typeof coursePriceSchema>;


  const form = useForm<z.infer<typeof coursePriceSchema>>({
    resolver: zodResolver(coursePriceSchema),
    defaultValues: {
      price: initialData.price||0,
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
      if (res) {
        console.log(res);
      }
      router.refresh()
      
    
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="px-4 py-5 bg-gray-200 xs:max-w-[200px] lg:max-w-[450px] rounded-lg flex w-full justify-between flex-col mt-6">
        <h1 className="text-xl">Course Price</h1>

        {editing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Price</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button
                type="submit"

                className="mt-4"
              >
                Save
              </Button>
            </form>
          </Form>
        ) : (
          <div className="flex flex-row  justify-between mt-6">
            <p className={cn("text-lg tracking-wider capitalize " ,initialData.price=== null && "italic text-sm" )}>{initialData.price || "no price"}</p>

            <button onClick={handleEdit} type="submit" className="btn"><Edit/></button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Price;
