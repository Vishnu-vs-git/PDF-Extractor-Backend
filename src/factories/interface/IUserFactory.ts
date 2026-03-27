import type { User } from "../../Entities/userEntity.js";
import type { IUserDocument } from "../../models/userModel.js";

export interface IUserFactory {
  toEntity(dbModel : IUserDocument): User
}