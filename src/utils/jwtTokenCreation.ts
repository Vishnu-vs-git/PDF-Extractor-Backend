import jwt from "jsonwebtoken";
import dotenv from"dotenv";
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const createAccessToken = (payload:object) => {
  return jwt.sign(payload, accessTokenSecret,{expiresIn: "1d"})
}
export const createRefreshToken = (payload :Object) => {
  return jwt.sign(payload,refreshTokenSecret,{expiresIn:"7d"})
}
