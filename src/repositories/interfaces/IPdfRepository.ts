import type { PdfEntity } from "../../Entities/pdfEntity.js";

export interface IPdfRepository {
  create(data:PdfEntity):Promise<PdfEntity| null>;
}