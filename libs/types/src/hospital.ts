import { BaseDocumentDef } from "./database";

export interface DepartmentDef extends BaseDocumentDef {
  name: string;
}

export interface MedicProfileTypeDef extends BaseDocumentDef {
  name: string;
  consultationFee?: number;
}
