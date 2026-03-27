import type { IUserLoginDTO } from "../../dtos/userLoginDTO.js";
import type { IUserRegisterDTO } from "../../dtos/userRegisterDTO.js";
import type { IUserResponseDTO } from "../../dtos/userResponseDTO.js";

export interface IUserService {

  signup(dto:IUserRegisterDTO):Promise<IUserResponseDTO>;
  login(dto: IUserLoginDTO): Promise<{user :IUserResponseDTO,accessToken:string,refreshToken:string}>

}