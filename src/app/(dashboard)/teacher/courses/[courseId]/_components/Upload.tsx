"use client";

import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

// Define interface of file uplaod

interface IFileUpload {
  endPoint: keyof typeof ourFileRouter;
  onChange: (url: string) => void;
}

const Upload = ({ endPoint, onChange }: IFileUpload) => {
  return (
    <div>
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res) => onChange(res[0].url)}
        onUploadError={(error)=>{
         throw new Error
        }}
      />
    </div>
  );
};

export default Upload;
