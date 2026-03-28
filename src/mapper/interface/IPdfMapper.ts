import type { IPdfCreationDTO } from "../../dtos/pdfCreationDTO.js";
import type { IPdfResponseDTO } from "../../dtos/pdfResponseDTO.js";
import type { PdfEntity } from "../../Entities/pdfEntity.js";

export interface IPdfMapper {
  toEntity(dto:IPdfCreationDTO): PdfEntity;
  toResponseDTO(pdf : PdfEntity): IPdfResponseDTO
}