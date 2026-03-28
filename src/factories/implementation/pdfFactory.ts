import { PdfEntity } from "../../Entities/pdfEntity.js";
import type { IPdfDocument } from "../../models/pdfModel.js";
import type { IPdfFactory } from "../interface/IPdfFactory.js";

export class PdfFactory implements IPdfFactory {
  toDomain(pdfDoc: IPdfDocument): PdfEntity {
      return new PdfEntity({
        id: pdfDoc._id.toString(),
        url: pdfDoc.url,
        publicId:pdfDoc.publicId,
        userId:pdfDoc.userId

      })
  }
}