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
import { courseAttachmentSchema } from "@/app/schemas/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Attachments, Course } from "@prisma/client";
import { File, Loader, UploadCloud, X } from "lucide-react";
import Upload from "./Upload";

interface InAttachments {
  initialData: Course & { attachments: Attachments[] };
  userId: string;
}

const AttachmentsComp = ({ initialData, userId }: InAttachments) => {
  console.log(initialData);

  const [editing, setEditing] = useState<boolean>(false);
  const [loading , setLoading] = useState<boolean>(false)
  const router =  useRouter()

  const formSchema = useForm<z.infer<typeof courseAttachmentSchema>>({
    resolver: zodResolver(courseAttachmentSchema),
  });

  const handleEdit = () => {
    setEditing(false);
  };
  const handleSave = async (data: any) => {
    console.log(data, "data");
    try {
      const res = await axios.post(
        `/api/create/${initialData.id}/attachments`,
        data
      );
      console.log(res);
      router.refresh()
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true)
    console.log(id)
    try {
      const res = await axios.delete(
        `/api/create/${initialData.id}/attachments/${id}`
      );
      console.log("attachments deleted successfully");
      setLoading(false)
       router.refresh()
      
    } catch (error) {
      console.log("error ocuured while deleting atttachment.");
    }
  };

  return (
    <div>
      <div className="px-4 py-5 bg-gray-200 xs:max-w-[250px] lg:max-w-[450px] rounded-lg flex w-full justify-between flex-col mt-6">
        <h1 className="text-xl">Course Attachments</h1>

        <div>
          {initialData.attachments &&
            initialData.attachments.map((item, index) => (
              <div
                key={index}
                className="mt-4 flex gap-x-3 justify-center items-center"
              >
              <span className="text-sm bg-blue-100 px-4 py-2 line-clamp-1 "> {item.name} </span>
                <button
                  className=""
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  
                  {
                    loading ? <Loader className="animate-spin"/>:<X/>
                  }
                </button>
              </div>
            ))}
        </div>

        <div>
          {
            initialData.attachments.length===0 && <div><span className="text-sm italic leading-5 tracking-wider">No attachments found</span></div>
          }
        </div>
        <div>
          {" "}
          <Upload
            endPoint="courseAttachments"
            onChange={(url) => {
              if (url) {
                handleSave({ url });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AttachmentsComp;
