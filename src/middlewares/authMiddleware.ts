import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGES } from "../common/errorMessages.js";
import { StatusCode } from "../common/statusCode.js";
import { CustomError } from "../common/customError.js";
import { createAccessToken } from "../utils/jwtTokenCreation.js";
import { TOKEN_TYPES } from "../common/tokenTypes.js";

export interface AuthRequest extends Request {
  userId?:string
}


export class AuthMiddleware{
  
  static authenticate (
  req : AuthRequest,
  res : Response,
  next : NextFunction
)  {
  try{
    const token = req.cookies?.accessToken;
    
    if(!token){
      return AuthMiddleware.refreshAccessToken(req,res,next)
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    if(!decoded || !decoded.id){
      throw new CustomError(ERROR_MESSAGES.INVALID_OR_EXPIRED,StatusCode.UNAUTHORIZED)
    }
    req.userId = decoded.id;
    next();
  }catch(err){
     next(err)
  }
}

private static async refreshAccessToken(
  req :AuthRequest,
  res : Response,
  next :NextFunction
){
  try{
    const refreshToken = req.cookies?.refreshToken;
    if(!refreshToken){
      throw new CustomError(ERROR_MESSAGES.REFRESH_TOKEN_MISSING,StatusCode.UNAUTHORIZED)
    }
    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET as string)as JwtPayload;
    if(!decoded || !decoded.id){
      throw new CustomError(ERROR_MESSAGES.INVALID_OR_EXPIRED,StatusCode.UNAUTHORIZED)
    }

    const token = await createAccessToken({id: decoded.id});
     res.cookie(TOKEN_TYPES.ACCESS_TOKEN, token, {
            httpOnly:true,
            secure :true,
            sameSite:"none",
            maxAge:Number(process.env.ACCESS_TOKEN_MAX_AGE)
          })
    req.userId =decoded.id;
    next();
  }catch(err){
    next(err)
  }
}
}
 
