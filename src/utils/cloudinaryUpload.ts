import cloudinary from "../config/cloudinary.js"
import type { UploadApiResponse } from "cloudinary"
import streamifier from "streamifier"

export const uploadToCloudinary = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise<UploadApiResponse>((resolve,reject) => {
    const stream = cloudinary.uploader.upload_stream({
      resource_type:"raw",
      folder:"pdf-uploads"
    },
    (error,result) => {
      if(error) return reject(error);
      resolve(result as UploadApiResponse);
    }
  );

  streamifier.createReadStream(buffer).pipe(stream)
  })
}