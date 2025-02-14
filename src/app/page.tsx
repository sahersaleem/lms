import Header from "@/components/Header";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full flex flex-row">
        <Sidebar />
        <Header />
      </div>
    </Suspense>
  );
}
