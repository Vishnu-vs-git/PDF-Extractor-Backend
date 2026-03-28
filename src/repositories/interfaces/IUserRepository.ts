import type { User } from "../../Entities/userEntity.js";

export interface IUserRepository {
  create(user : User): Promise<User| null>;
  findByEmail(email :string): Promise<User | null>
}