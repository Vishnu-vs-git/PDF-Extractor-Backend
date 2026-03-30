
import type { User } from "../../Entities/userEntity.js";
import type { IUserFactory } from "../../factories/interface/IUserFactory.js";
import { UserModel } from "../../models/userModel.js";
import type { IUserRepository } from "../interfaces/IUserRepository.js";

export class UserRepository implements IUserRepository {
   
   constructor(
     private _userEntityFactory : IUserFactory
   ){}

   async create(user : User): Promise<User | null> {
    const data = user.toPersistence();
       const createdUser = await UserModel.create(data);
       return createdUser?this._userEntityFactory.toEntity(createdUser): null;
   }
   async findByEmail(email :string): Promise<User | null> {
       const fetchedUser = await UserModel.findOne({email});
      return fetchedUser ? this._userEntityFactory.toEntity(fetchedUser): null
   }
   async findById(userId :string): Promise<User|null> {
        const fetchedUser = await UserModel.findById(userId);
        return fetchedUser ? this._userEntityFactory.toEntity(fetchedUser): null
   }
}