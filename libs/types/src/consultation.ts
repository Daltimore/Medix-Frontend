import { BaseDocumentDef } from "./database";

export const consultationTypes = [
  "doctor",
  "nurse",
  "radiography",
  "antenatal",
] as const;

export type ConsultationType = typeof consultationTypes[number];

export const consultationPriorityTypes = ["low", "medium", "high"] as const;

export type ConsultationPriorityType = typeof consultationPriorityTypes[number];

export const consultationCheckInTypes = ["private", "HMO", "NHIS"] as const;

export type ConsultationCheckInTypes = typeof consultationCheckInTypes[number];

export interface ConsultationDef extends BaseDocumentDef {
  consultationType: ConsultationType;
  priority: ConsultationPriorityType;
  checkInType: ConsultationCheckInTypes;
  patientId: string;
}
