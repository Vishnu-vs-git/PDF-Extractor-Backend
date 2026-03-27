import type { User } from "../../Entities/userEntity.js";

export interface IUserRepository {
  create(data : User): Promise<User| null>;
  findByEmail(email :string): Promise<User | null>
}