import mongoose from "mongoose";
import dotenv from "dotenv";
import { ERROR_MESSAGES } from "../common/errorMessages.js";
dotenv.config();

 export class MongoDbConnect {
  constructor(){}
 static  async connect(){
  try{
    const mongoURI = process.env.MONGOURI as string;
    if(!mongoURI) throw new Error(ERROR_MESSAGES.MONGO_URI_ERROR);

    await mongoose.connect(mongoURI)
    console.log("mongo db connected")
  
  }catch(err){
     console.log(err);
  }
 

 }
 }