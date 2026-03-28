import type { PdfEntity } from "../../Entities/pdfEntity.js";
import type { IPdfFactory } from "../../factories/interface/IPdfFactory.js";
import { PdfModel } from "../../models/pdfModel.js";
import type { IPdfRepository } from "../interfaces/IPdfRepository.js";

export class PdfRepository implements IPdfRepository {
       constructor(
        private _pdfFactory : IPdfFactory
       ){}
  async create(data: PdfEntity): Promise<PdfEntity| null> {
      const created = await PdfModel.create(data);
      return created?this._pdfFactory.toDomain(created):null
  }
}