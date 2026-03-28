
import { ERROR_MESSAGES } from "../../common/errorMessages.js";
import { BAD_REQUEST_ERROR, CREATION_FAILED_ERROR, NOT_FOUND_ERROR } from "../../common/errors.js";
import type { IUserLoginDTO } from "../../dtos/userLoginDTO.js";
import type { IUserRegisterDTO } from "../../dtos/userRegisterDTO.js";
import type { IUserResponseDTO } from "../../dtos/userResponseDTO.js";
import type { IUserMapper } from "../../mapper/interface/IUserMapper.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { comparePassword } from "../../utils/comparePassword.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { createAccessToken, createRefreshToken } from "../../utils/jwtTokenCreation.js";
import type { IUserService } from "../interface/IUserService.js";

export class UserService implements IUserService {
   constructor(
     private _userRepo : IUserRepository,
     private _userMapper : IUserMapper
   ){}
  async signup(dto: IUserRegisterDTO): Promise<IUserResponseDTO> {
      
   const existingUser = await this._userRepo.findByEmail(dto.email);
   if(existingUser) {
     throw new BAD_REQUEST_ERROR(ERROR_MESSAGES.USER_EXIST)
   }

   const hashedPassword = await hashPassword(dto.password);
   if(!hashedPassword)throw new CREATION_FAILED_ERROR(ERROR_MESSAGES.PASSWORD_HASH_ERROR);
    
    const userEntity = this._userMapper.toEntity({...dto,password:hashedPassword});

    const createdUserEntity = await this._userRepo.create(userEntity);
    if(!createdUserEntity)throw new CREATION_FAILED_ERROR(ERROR_MESSAGES.USER_SAVE_ERROR);

    return this._userMapper.toResponseDTO(createdUserEntity)

  }
  async login(dto: IUserLoginDTO): Promise<{user :IUserResponseDTO,accessToken:string,refreshToken:string}> {
      
    const user = await this._userRepo.findByEmail(dto.email);
     if(!user)throw new NOT_FOUND_ERROR(ERROR_MESSAGES.USER_NOT_FOUND);
     const isMatch = await comparePassword(dto.password,user.getPassword());
     if(!isMatch)throw new BAD_REQUEST_ERROR(ERROR_MESSAGES.PASSWORD_INVALID);

     const accessToken = createAccessToken({id:user.id});
     const refreshToken = createRefreshToken({id:user.id});
    
     const userDTO = this._userMapper.toResponseDTO(user);

     return {
      user:userDTO,
      accessToken,
      refreshToken
     }
  }
}