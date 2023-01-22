import { BaseDocumentDef } from "./database";

export const profileTypes = ["Administrator"] as const;

export interface UserDef extends BaseDocumentDef {
  username: string;
  firstName: string;
  lastName: string;
  otherNames?: Array<string>;
  email: string;
  department?: string;
  password?: string;
  profileType: typeof profileTypes[number];
}

export interface UserSignInPayloadDef {
  email?: string;
  username?: string;
  password: string;
  tenant: string;
}

export const genders = ["male", "female"] as const;

export const maritalStatuses = ["single", "married"] as const;
