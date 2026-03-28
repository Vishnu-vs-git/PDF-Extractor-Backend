import type { NextFunction, Request, Response } from "express";
import { BAD_REQUEST_ERROR, CREATION_FAILED_ERROR, FORBIDDEN_ERROR, NOT_FOUND_ERROR } from "../common/errors.js";
import { StatusCode } from "../common/statusCode.js";
import jwt from 'jsonwebtoken';
import { CustomError } from "../common/customError.js";
import { ERROR_MESSAGES } from "../common/errorMessages.js";
import { ZodError } from "zod";


export class ErrorHandlingMiddleware {
  static handleError(
    err: Error,
    req : Request,
    res : Response,
    next : NextFunction
  ){
      if (err instanceof NOT_FOUND_ERROR) {
      return res.status(StatusCode.NOT_FOUND).json({
        success: false,
        statusCode: StatusCode.NOT_FOUND,
        message: err.message,
        errors: [],
      });
    }

    if (err instanceof BAD_REQUEST_ERROR) {
      return res.status(StatusCode.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        message: err.message,
        errors: [],
      });
    }
     if (err instanceof CREATION_FAILED_ERROR) {
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
         success: false,
         statusCode: StatusCode.INTERNAL_SERVER_ERROR,
         message: err.message,
         errors: [],
        });
      }
      
      
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_OR_EXPIRED,
        
        });
      }
      if (err instanceof FORBIDDEN_ERROR) {
        return res.status(StatusCode.FORBIDDEN).json({
          success: false,
         message: ERROR_MESSAGES.INVALID_OR_EXPIRED,
         
        });
      }
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          success: false,
          statusCode: StatusCode.UNAUTHORIZED,
          message: ERROR_MESSAGES.INVALID_OR_EXPIRED,
          
        });
      }
      
      if (err instanceof ZodError) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          statusCode: StatusCode.BAD_REQUEST,
          message: ERROR_MESSAGES.ZOD_ERROR,
          errors: err.issues.map(e => `${e.path.join('.')} - ${e.message}`),
        });
      }
      if (err instanceof CustomError) {
       
        return res.status(err.statusCode).json({
          success: false,
          statusCode: err.statusCode,
          
          message: err.message,
         
        });
      }
      
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      errors: [],
    });
  }

  }
