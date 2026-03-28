import mongoose, { Schema, type Document } from "mongoose";

export interface IPdfDocument extends Document {
  url :string;
  publicId :string;
  userId :string;
  createdAt?:Date
}

const pdfSchema = new Schema<IPdfDocument>({
   url:{
    type: String,
    required :true
   },
   publicId :{
    type : String,
    required :true
   },
   userId:{
    type: String,
    required : true
   }
},{timestamps:true})

export const PdfModel = mongoose.model<IPdfDocument>("Pdf",pdfSchema);