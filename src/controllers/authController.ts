import type { NextFunction, Request, Response } from "express";
import type { IUserService } from "../services/interface/IUserService.js";
import { StatusCode } from "../common/statusCode.js";
import { SUCCESS_MESSAGE } from "../common/successMessages.js";
import { TOKEN_TYPES } from "../common/tokenTypes.js";
import dotenv from"dotenv"
dotenv.config()

export class AuthController {
  constructor(
    private _userService : IUserService
  ){}

 signup = async(req: Request, res : Response, next:NextFunction) => {
   try{
     const user = await this._userService.signup(req.body);
     res.status(StatusCode.CREATED).json({
       success: true,
       message : SUCCESS_MESSAGE.USER_CREATED
     })
   }catch(err){
    next(err)
   }
 }
 login = async (req: Request, res: Response, next:NextFunction) => {
  try{
      const {user, accessToken,refreshToken} = await this._userService.login(req.body);
      res.cookie(TOKEN_TYPES.ACCESS_TOKEN, accessToken, {
        httpOnly:true,
        secure :true,
        sameSite:"none",
        maxAge:Number(process.env.ACCESS_TOKEN_MAX_AGE)
      })

      res.cookie(TOKEN_TYPES.REFRESH_TOKEN,refreshToken,{
        httpOnly:true,
        secure :true,
        sameSite:"none",
        maxAge:Number(process.env.REFRESH_TOKEN_MAX_AGE)
      })

    res.status(StatusCode.OK).json({
      success: true,
      message: SUCCESS_MESSAGE.USER_LOGGED_IN,
      data: user

    })


  }catch(err){
    next(err)
  }
 }
}