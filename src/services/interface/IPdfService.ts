
import type {Express} from "express"
import type { IPdfResponseDTO } from "../../dtos/pdfResponseDTO.js"
import type { IPdfExtractionRequestDTO } from "../../dtos/pdfExtractionReqDTO.js";
export interface IPdfService {
  upload(file: Express.Multer.File, userId: string): Promise<IPdfResponseDTO>;
  extractPages(dto:IPdfExtractionRequestDTO,userId :string) :Promise<IPdfResponseDTO>;
}