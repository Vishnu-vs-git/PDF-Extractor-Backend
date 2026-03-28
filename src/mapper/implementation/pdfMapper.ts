import type { IPdfCreationDTO } from "../../dtos/pdfCreationDTO.js";
import type { IPdfResponseDTO } from "../../dtos/pdfResponseDTO.js";
import { PdfEntity } from "../../Entities/pdfEntity.js";
import type { IPdfMapper } from "../interface/IPdfMapper.js";

export class PdfMapper implements IPdfMapper {
  constructor(){}
  toEntity(dto: IPdfCreationDTO): PdfEntity {
      return new PdfEntity({
        url: dto.url,
        publicId : dto.publicId,
        userId : dto.userId
      })
  }
  toResponseDTO(pdf: PdfEntity): IPdfResponseDTO {
      return {
        id: pdf.id!,
        url: pdf.url,
        publicId:pdf.publicId,
        userId : pdf.userId
      }
  }
}