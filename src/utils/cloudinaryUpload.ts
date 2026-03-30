import cloudinary from "../config/cloudinary.js"
import type { UploadApiResponse } from "cloudinary"
import streamifier from "streamifier"

export const uploadToCloudinary = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise<UploadApiResponse>((resolve,reject) => {
    const stream = cloudinary.uploader.upload_stream({
      resource_type:"raw",
      folder:"pdf-uploads",
      format: "pdf",
    },
    (error,result) => {
      if(error)  {
         console.log(error)
        reject(error)
        return
      }
      console.log("✅ CLOUDINARY SUCCESS");
      resolve(result as UploadApiResponse);
    }
  );

  streamifier.createReadStream(buffer).pipe(stream)
  })
}