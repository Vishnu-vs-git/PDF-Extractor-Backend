import bcrypt from "bcrypt"
export const comparePassword = (loginPassword: string, password:string) => {

  return bcrypt.compare(loginPassword,password);
}