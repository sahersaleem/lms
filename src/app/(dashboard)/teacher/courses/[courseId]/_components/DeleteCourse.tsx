"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

interface DeleteChapterProps {
  courseId: string;

}

const DeleteCourse = ({ courseId }: DeleteChapterProps) => {

const router = useRouter()


  async function handleDelete() {
    try {
      const res = await axios.delete(`/api/create/${courseId}`);
      console.log(res)
      console.log("chapter deleted succesfully");
      
        router.refresh()

        
        router.push(`/teacher/courses`)
    } catch (error: any) {
      console.log("CHAPTER DELETED SUCCESSFULLY", error.message);
    }
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <FaRegTrashCan className="text-white" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              do you want to delete this course?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteCourse;
