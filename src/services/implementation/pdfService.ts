import type { UploadApiResponse } from "cloudinary";
import type { IPdfService } from "../interface/IPdfService.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload.js";
import type { IPdfRepository } from "../../repositories/interfaces/IPdfRepository.js";
import type { IPdfMapper } from "../../mapper/interface/IPdfMapper.js";
import { ERROR_MESSAGES } from "../../common/errorMessages.js";
import { CREATION_FAILED_ERROR } from "../../common/errors.js";
import type { IPdfResponseDTO } from "../../dtos/pdfResponseDTO.js";

export class PDFService implements IPdfService {
  constructor(
        private _pdfRepo : IPdfRepository,
        private _pdfMapper : IPdfMapper
  ){}
async upload(file: Express.Multer.File, userId: string): Promise<IPdfResponseDTO> {
   
 const result:UploadApiResponse = await uploadToCloudinary(file.buffer);
 if(!result)throw new Error(ERROR_MESSAGES.UPLOAD_TO_CLOUDINARY_FAILED)
  const pdfEntity = this._pdfMapper.toEntity({
     url : result.secure_url,
     publicId : result.public_id,
     userId
  })
    const pdf = await this._pdfRepo.create(pdfEntity);
    
    ERROR_MESSAGES
    if (!pdf) {
      throw new CREATION_FAILED_ERROR(ERROR_MESSAGES.PDF_CREATION_FAILED);
    }
    return this._pdfMapper.toResponseDTO(pdf)
  }
}   