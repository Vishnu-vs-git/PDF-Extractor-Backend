import type { PdfEntity } from "../../Entities/pdfEntity.js";
import type { IPdfDocument } from "../../models/pdfModel.js";

export interface IPdfFactory {
  toDomain(pdfDoc:IPdfDocument): PdfEntity
}