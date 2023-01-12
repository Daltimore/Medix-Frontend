import { BaseDocumentDef } from "./database";
import { genders, maritalStatuses } from "./user";

export const temperatureUnits = ["C", "F", "K"] as const;
export type temperatureUnit = typeof temperatureUnits[number];

export interface PatientVitalsDef {
  temperature?: number;
  temperatureUnit: temperatureUnit;
  pulse?: number;
  respiration?: number;
}

export const genotypes = ["AA", "AO", "BB", "BO", "AB", "OO"] as const;
export type genotype = typeof genotypes[number];

export const bloodGroups = ["A", "B", "AB", ""] as const;
export type bloodGroup = typeof bloodGroups[number];

export interface NextOfKinDef {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

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
  vitals?: PatientVitalsDef;
  genotype?: genotype;
  bloodGroup?: bloodGroup;
  isReferredPatient: boolean;
  referrerId?: string;
  nextOfKin?: NextOfKinDef;
}
