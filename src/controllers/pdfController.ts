import type { NextFunction, Request, Response } from "express";
import type { IPdfService } from "../services/interface/IPdfService.js";
import { StatusCode } from "../common/statusCode.js";
import { ERROR_MESSAGES } from "../common/errorMessages.js";
import { SUCCESS_MESSAGE } from "../common/successMessages.js";
import {  CREATION_FAILED_ERROR } from "../common/errors.js";
import { CustomError } from "../common/customError.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";

export class PdfController {
  constructor(
    private _pdfService : IPdfService
  ){}

  upload = async (req: AuthRequest,res: Response, next :NextFunction) => {
    try{
       console.log("userr")
      const userId = req?.userId;
       if(!userId)throw new CustomError(ERROR_MESSAGES.USER_ID_REQUIRED,StatusCode.BAD_REQUEST);
     const file = req.file;
     console.log("reeee",file)
     if(!file){
       return res.status(StatusCode.BAD_REQUEST).json({
        success: false,
        message : ERROR_MESSAGES.NO_FILE_UPLOADED
       })
     }
     console.log("hello",userId)
     const pdf = await this._pdfService.upload(file,userId!);
     res.status(StatusCode.CREATED).json({
      success : true,
      message : SUCCESS_MESSAGE.PDF_UPLOAD_SUCCESS,
      data: pdf
     })
    }catch(err){
        if (err instanceof CREATION_FAILED_ERROR) {
               return next(
                 new CustomError(err.message, StatusCode.INTERNAL_SERVER_ERROR)
               );
             }
       
             return next(err);
    }
  }
  extractPages = async (req: AuthRequest,res:Response,next:NextFunction) => {
    try{
      const userId = req?.userId;
      if(!userId)throw new CustomError(ERROR_MESSAGES.USER_ID_REQUIRED,StatusCode.BAD_REQUEST);
       const pdf = await this._pdfService.extractPages(req.body,userId);
       res.status(StatusCode.OK).json({
        success :true,
         message : SUCCESS_MESSAGE.PDF_EXTRACTED_SUCCESS,
         data:pdf
       })

    }catch(err){
       if (err instanceof CREATION_FAILED_ERROR) {
               return next(
                 new CustomError(err.message, StatusCode.INTERNAL_SERVER_ERROR)
               );
             }
       
             return next(err);
    }
  }
}