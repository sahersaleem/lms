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
import { chapterVideoUrl } from "@/app/schemas/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course, MuxData } from "@prisma/client";
import { UploadButton } from "@uploadthing/react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import Upload from "./Upload";
import { Chapter } from "@prisma/client";
import { FaPlusCircle } from "react-icons/fa";
import MuxPlayer from "@mux/mux-player-react"


export interface IChapters {
  chapter: Chapter & {muxdata?:MuxData|null}
  courseid: string;
}

const VideoUpload = ({ chapter , courseid}: IChapters) => {
  const router = useRouter();
  type CourseName = z.infer<typeof chapterVideoUrl>;
  const form = useForm<z.infer<typeof chapterVideoUrl>>({
    resolver: zodResolver(chapterVideoUrl),
    defaultValues: {
      videoUrl:chapter.videoUrl!
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
      const res = await axios.patch(`/api/create/${courseid}/chapters/${chapter.id}`, data);
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
      <div className="px-4 py-5 bg-gray-200 xs:max-w-[240px] lg:max-w-[450px] rounded-lg flex w-full justify-between flex-col mt-6">
        <h1 className="text-xl">Chapter Video</h1>

        <div
          className={cn(
            "flex  flex-row  justify-between mt-6 ",
            !chapter.videoUrl&& " text-black"
          )}
        >
          <p>
            {!chapter.videoUrl && "no videos"}
          </p>

          {chapter.videoUrl ? (
            <UploadCloud />
          ) : (
            <Button onClick={handleEdit} type="submit">
              <FaPlusCircle/>
            </Button>
          )}
        </div>

        <div>
          { !editing  && chapter.videoUrl && (
            <div>
            <MuxPlayer playbackId={chapter.muxdata?.playBackId||""}/>
            </div>
          )}
 
          {!chapter.videoUrl && (
            <Upload
              endPoint="chapterVideo"
              onChange={(url) => {
                if (url) {
                  handleSave({ videoUrl: url });
                }
              }}
            />


        )}
             { editing && (
                <Upload
                endPoint="chapterVideo"
                onChange={(url) => {
                  if (url) {
                    handleSave({videoUrl: url });
                  }
                }}
              />
              )}
            
        
        </div>
      </div>
    </div>
  );
};
export default VideoUpload;
