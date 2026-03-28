import type { IUserRegisterDTO } from "../../dtos/userRegisterDTO.js";
import type { IUserResponseDTO } from "../../dtos/userResponseDTO.js";
import type { User } from "../../Entities/userEntity.js";

export interface IUserMapper {
  toEntity(data: IUserRegisterDTO): User;
  toResponseDTO(data :User): IUserResponseDTO;
}