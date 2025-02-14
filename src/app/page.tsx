import Header from "@/components/Header";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
export default function Home() {
  return (
   <div className="w-full flex flex-row">
    <Sidebar/>
  <Header/>

   </div>
  );
}
