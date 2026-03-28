
import type {Express} from "express"
import type { IPdfResponseDTO } from "../../dtos/pdfResponseDTO.js"
export interface IPdfService {
  upload(file: Express.Multer.File, userId: string): Promise<IPdfResponseDTO> 
}