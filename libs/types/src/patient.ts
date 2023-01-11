import { BaseDocumentDef } from "./database";
import { genders, maritalStatuses } from "./user";

export interface PatientDef extends BaseDocumentDef {
  firstName: string;
  lastName: string;
  otherName?: string;
  gender?: typeof genders[number];
  maritalStatus?: typeof maritalStatuses[number];
  title?: string;
  address?: string;
  age?: [number, string];
  dateOfBirth?: Date;
  primaryPhoneNumber?: string;
  email?: string;
}
