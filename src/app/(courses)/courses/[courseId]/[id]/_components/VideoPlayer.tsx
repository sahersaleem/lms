"use client";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { Loader, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import PriceButton from "./PriceButton";
import CourseProgressbtn from "../../../_components/CourseProgressbtn";

interface VideoPlayerProps {
  playBackId: string;
  chapterId: string;
  courseId: string;
  nextChapterId: string;
  isLocked: boolean;
  completedOnEnd: boolean;
  title: string;
  price: number;
  description: string;
  isCompleted: boolean;
}

const VideoPlayer = ({
  playBackId,
  chapterId,
  courseId,
  nextChapterId,
  isLocked,
  completedOnEnd,
  title,
  price,
  description,
  isCompleted,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const confetti = useConfettiStore();
  const router = useRouter();
  console.log(nextChapterId)

  const onEnd = async () => {

    console.log(nextChapterId)
    try {
      const res = await axios.put(
        `/api/create/${courseId}/chapters/${chapterId}/progress`,
        { isCompleted: true }
      );
    router.refresh()

      if(nextChapterId){
        console.log(nextChapterId)
        router.push(`/courses/${courseId}/${nextChapterId}`);
      }
      if (!nextChapterId) {
        confetti.onOpen();
      } 

     
       
      
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div
        className="aspect-video bg-slate-900 relative flex justify-center items-center flex-col
    "
      >
        {isReady && !isLocked && (
          <div>
            <Loader className="animate-spin" />
          </div>
        )}
        {isLocked && (
          <div className="flex flex-col items-center justify-center">
            <Lock className="text-white " size={50} />
            <span className="text-white">You need to unlock this chapter</span>
          </div>
        )}
        {!isLocked && (
          <MuxPlayer
            title={title}
            playbackId={playBackId}
            onCanPlay={() => setIsReady(true)}
            autoPlay
            onEnded={onEnd}
          />
        )}
      </div>
      <div className="flex xs:justify-center  xs:flex-col lg:flex-row lg:justify-between items-center mt-10">
        <div>
          {" "}
          <h1 className="text-2xl font-bold">{title}</h1>{" "}
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        {isLocked ? (
          <PriceButton courseId={courseId} price={price} />
        ) : (
          <CourseProgressbtn
            nextChapterId={nextChapterId}
            courseId={courseId}
            chapterId={chapterId}
            isCompleted={isCompleted}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
