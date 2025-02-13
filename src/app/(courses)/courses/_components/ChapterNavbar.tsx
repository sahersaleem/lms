"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Input from "@/components/Input-box";
import { useParams } from "next/navigation";
const ChapterNavbar = () => {
  const path = usePathname();
  const params = useParams()


  return (
    <div className="bg-white w-full px-10 pt-8  text-white py-4 shadow-sm borber-b border-black/40">
      <div className="flex justify-end items-center ">
       
        <div className="flex items-center justify-end gap-x-10 text-lg tracking-widest leading-5 ">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          {path.startsWith(`/courses/${params.id}`) ? "": (
            <Link href={"/browse"}>
              <Button variant={"secondary"}>Exit</Button>
            </Link>
          ) }

          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default ChapterNavbar;
