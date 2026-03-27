import mongoose, {  Schema, type Document } from "mongoose";


export interface IUserDocument extends Document {
 name :string;
 email: string;
 password :string;
 createdAt?: Date;
 updatedAt?: Date
}

const userSchema = new Schema<IUserDocument>({
  name: {
    type :String
  },
  email : {
     type :String
  },
  password : {
    type : String
  }
},{timestamps : true})

export const UserModel = mongoose.model<IUserDocument>("User",userSchema);
