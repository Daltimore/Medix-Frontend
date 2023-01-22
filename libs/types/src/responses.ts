import { ConsultationDef } from "./consultation";
import { UserDef } from "./user";
import { PatientDef } from "./patient";
import { PaginateResult } from "./database";

export type GetConsultationsResponse = PaginateResult<{
  consultation: ConsultationDef;
  patient: PatientDef | null;
  checkedInBy: UserDef | null;
}>;
