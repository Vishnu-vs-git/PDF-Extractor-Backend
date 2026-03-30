import type { NextFunction, Request, Response } from "express";
import type { IUserService } from "../services/interface/IUserService.js";
import { StatusCode } from "../common/statusCode.js";
import { SUCCESS_MESSAGE } from "../common/successMessages.js";
import { TOKEN_TYPES } from "../common/tokenTypes.js";
import dotenv from"dotenv"
import { BAD_REQUEST_ERROR, CREATION_FAILED_ERROR, NOT_FOUND_ERROR } from "../common/errors.js";
import { CustomError } from "../common/customError.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import { ERROR_MESSAGES } from "../common/errorMessages.js";
dotenv.config()

export class AuthController {
  constructor(
    private _userService : IUserService
  ){}

 signup = async(req: Request, res : Response, next:NextFunction) => {
 
   try{
      await this._userService.signup(req.body);
     res.status(StatusCode.CREATED).json({
       success: true,
       message : SUCCESS_MESSAGE.USER_CREATED
     })
   }catch(err){
     if (err instanceof BAD_REQUEST_ERROR) {
        return next(new CustomError(err.message, StatusCode.BAD_REQUEST));
      }

      if (err instanceof CREATION_FAILED_ERROR) {
        return next(
          new CustomError(err.message, StatusCode.INTERNAL_SERVER_ERROR)
        );
      }

      return next(err);
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
     if (err instanceof BAD_REQUEST_ERROR) {
        return next(new CustomError(err.message, StatusCode.BAD_REQUEST));
      }

      if (err instanceof NOT_FOUND_ERROR) {
        return next(new CustomError(err.message, StatusCode.NOT_FOUND));
      }

      return next(err);
  }
 }
 getUser = async(req: AuthRequest,res: Response,next:NextFunction) => {
    try{
      
       const userId = req.userId;
       if(!userId)if(!userId)throw new CustomError(ERROR_MESSAGES.USER_ID_REQUIRED,StatusCode.BAD_REQUEST);
       const user = await this._userService.getUserData(userId);
      res.status(StatusCode.OK).json({success:true,message:SUCCESS_MESSAGE.USER_DATA_FETCH_SUCCESS,data: user});    
    }catch(err){

    }
 }
 logout = async (req: AuthRequest,res:Response, next:NextFunction) => {
   try{
       res.clearCookie(TOKEN_TYPES.ACCESS_TOKEN,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        
       })
       res.clearCookie(TOKEN_TYPES.REFRESH_TOKEN,{
         httpOnly:true,
         secure:true,
         sameSite:"none"
       })
       res.status(StatusCode.OK).json({success:true, message:SUCCESS_MESSAGE.USER_LOGOUT});
   }catch(err){
      next(err)
   }
 }
}