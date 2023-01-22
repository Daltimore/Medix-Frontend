import { BaseDocumentDef } from "./database";
import { PatientVitalsDef } from "./patient";

export const consultationTypes = [
  "doctor",
  "nurse",
  "radiography",
  "antenatal",
] as const;

export type ConsultationType = typeof consultationTypes[number];

export const consultationPriorityTypes = ["low", "medium", "high"] as const;

export type ConsultationPriorityType = typeof consultationPriorityTypes[number];

export const consultationCheckInTypes = [
  "private-single",
  "walk-in",
  "accident & emergency",
] as const;

export type ConsultationCheckInTypes = typeof consultationCheckInTypes[number];

export interface ConsultationDef extends BaseDocumentDef {
  consultationType: ConsultationType;
  priority: ConsultationPriorityType;
  checkInType: ConsultationCheckInTypes;
  patientId: string;
  hasStartedVitalSigns: boolean;
  hasCompletedVitalSigns: boolean;
  vitalSigns: Partial<PatientVitalsDef>;
  checkedInBy: string;
  assignedTo?: string;
}
