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
import { CourseImageSchema } from "@/app/schemas/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { UploadButton } from "@uploadthing/react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import Upload from "./Upload";

export interface InitialData {
  initialData: Course;
  userId: string;
}

const ImageUpload = ({ initialData, userId }: InitialData) => {
  const router = useRouter();
  type CourseName = z.infer<typeof CourseImageSchema>;
  const form = useForm<z.infer<typeof CourseImageSchema>>({
    resolver: zodResolver(CourseImageSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || "",
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
      setEditing(false);
      router.refresh();

      if (res) {
        console.log(res);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="px-4 py-5 bg-gray-200 xs:max-w-[250px] lg:max-w-[450px] rounded-lg flex w-full justify-between flex-col mt-6">
        <h1 className="text-xl">Course Images</h1>

        <div
          className={cn(
            "flex  flex-row  justify-between mt-6 ",
            !initialData.imageUrl && " text-black"
          )}
        >
          <p>
            {!initialData.imageUrl && "no Images"}
          </p>

          {!initialData.imageUrl ? (
            <UploadCloud />
          ) : (
            <Button onClick={handleEdit} type="submit">
              Edit
            </Button>
          )}
        </div>

        <div>
          { !editing  && initialData.imageUrl && (
            <div>
              <Image alt="upload" src={initialData.imageUrl} width={300} height={300} />
            </div>
          )}
 
          {!initialData.imageUrl && (
            <Upload
              endPoint="courseImage"
              onChange={(url) => {
                if (url) {
                  handleSave({ imageUrl: url });
                }
              }}
            />


        )}
             { editing && (
                <Upload
                endPoint="courseImage"
                onChange={(url) => {
                  if (url) {
                    handleSave({ imageUrl: url });
                  }
                }}
              />
              )}
            
        
        </div>
      </div>
    </div>
  );
};
export default ImageUpload;
