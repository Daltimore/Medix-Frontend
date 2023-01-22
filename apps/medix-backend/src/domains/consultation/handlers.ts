import { ConsultationModel } from "./models";
import { PatientModel } from "~/domains/patient";
import dayjs from "dayjs";
import { parsePaginationQs } from "~/utils";
import { Request } from "express";
import {
  ConsultationDef,
  GetConsultationsResponse,
  PatientDef,
  UserDef,
} from "@medix/types/dist";
import { PaginateResult } from "mongoose";
import { UserModel } from "~/domains/user/models";

export const getConsultations = async (
  paginationQueryObject?: Request["query"],
  assignedTo?: string
): Promise<PaginateResult<GetConsultationsResponse>> => {
  const { docs, ...pagination }: PaginateResult<ConsultationDef> =
    await ConsultationModel.paginate(
      {
        assignedTo,
        createdAt: {
          $gt: dayjs().subtract(7, "days"),
        },
      },
      paginationQueryObject
        ? parsePaginationQs(paginationQueryObject)
        : {
            pagination: false,
          }
    );

  const result = [];

  for (const consultation of docs) {
    const patient: PatientDef | null = await PatientModel.findById(
      consultation.patientId
    );
    const checkedInBy: UserDef | null = await UserModel.findById(
      consultation.checkedInBy
    );

    result.push({
      consultation,
      patient,
      checkedInBy,
    });
  }

  return {
    ...(pagination as PaginateResult<GetConsultationsResponse>),
    docs: [...result] as any,
  };
};
