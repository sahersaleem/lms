import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log(req);
  
  const request = await req.json();

  const { id } = request



  const categoryInformation = await db.category.findUnique({
    where: {
      id
    },
  });

  if (!categoryInformation) {
    throw new Error("category information not found");
  }

  console.log(categoryInformation);
  

  return NextResponse.json({categoryInformation})



}
