import { User } from "../../Entities/userEntity.js";
import type { IUserDocument } from "../../models/userModel.js";
import type { IUserFactory } from "../interface/IUserFactory.js";

export class UserFactory implements IUserFactory {
  toEntity(dbModel: IUserDocument): User {
   return  new User({
    id:dbModel._id.toString(),
    name : dbModel.name,
    email : dbModel.email,
    password : dbModel.password
   })
  }
}