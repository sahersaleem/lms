"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Input from "./Input-box";

// import { isTeacher } from "@/lib/teacher";

const Header = () => {
  const path = usePathname();
  const isSearchpage = path.includes("/browse");
  const { userId } = useAuth();

  // const isTeacherId = isTeacher(userId!);

  return (
    <div className="bg-white w-full px-10 pt-8  py-4 shadow-sm borber-b border-black/40">
      <div className="flex xs:justify-center lg:justify-between items-center  xs:flex-col lg:flex-row xs:gap-y-4 ">
        <Input />
        <div className="flex items-center justify-end gap-x-10 text-lg tracking-widest leading-5 xs:order-1 lg:order-2">
          {!userId && (
            <button className="text-white bg-blue-600 p-3 hover:bg-blue-700 transition-colors duration-200 ease-in-out">
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </button>
          )}

          {path.startsWith("/teacher") ? (
            <Link href={"/dashboard"}>
              <Button variant={"secondary"}>Exit</Button>
            </Link>
          ) : (
            <Link href={"/teacher/courses"}>
              { (
                <Button variant={"secondary"}>Teacher mode</Button>
              )}
            </Link>
          )}

          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Header;
