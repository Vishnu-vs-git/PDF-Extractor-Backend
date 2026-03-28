import type { IUserRegisterDTO } from "../../dtos/userRegisterDTO.js";
import type { IUserResponseDTO } from "../../dtos/userResponseDTO.js";
import { User } from "../../Entities/userEntity.js";
import type { IUserMapper } from "../interface/IUserMapper.js";

export class UserMapper implements IUserMapper {
  toEntity(data: IUserRegisterDTO): User {
      return new User({
        name: data.name,
        password : data.password,
        email:data.email
      })
  }
  toResponseDTO(data: User): IUserResponseDTO {
      return {
        name : data.name,
        email : data.email,
        id : data.id
      }
  }
}