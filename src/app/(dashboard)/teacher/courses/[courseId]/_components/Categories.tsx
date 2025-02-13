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
import { categorySchema } from "@/app/schemas/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ComboboxDemo } from "@/components/ui/combobox";

interface InitialData {
  initialData: {
    id: string;
    title: String;
  };
  options: { label: string; value: string }[];
  userId: string;
}

const Category = ({ initialData, userId, options }: InitialData) => {
  const [category , setCategory] = useState<string>("")
    const router = useRouter();
  type Category = z.infer<typeof categorySchema>;
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: initialData.id,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const [editing, setEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (data: any) => {
    console.log(initialData, "inital data");
    try {
      console.log(data);
      const res :any= await axios.patch(`/api/create/${initialData.id}`, data);
      setEditing(false);
      router.refresh();

      if (res.data.updatedTitle.categoryId) {
        const id = res.data.updatedTitle.categoryId;
        const response:any = await axios.post("/api/category", {id});
        console.log(response);
    
        setCategory(response.data.categoryInformation.name)
        router.refresh()
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="px-4 py-5 bg-gray-200 xs:max-w-[200px] lg:max-w-[450px] rounded-lg flex w-full justify-between flex-col mt-6">
        <h1 className="text-xl">Course Categories</h1>

        {editing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <ComboboxDemo options={options} {...field} />
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
          <div className="flex flex-row  justify-between mt-6">
            <p className="text-lg tracking-wider capitalize">
              {category||"no categories found"}
            </p>

            <Button onClick={handleEdit} type="submit">
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Category;
