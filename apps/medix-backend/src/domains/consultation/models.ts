import { PaginateModel, Schema, model } from "mongoose";
import {
  ConsultationDef,
  consultationCheckInTypes,
  consultationPriorityTypes,
  consultationTypes,
} from "@medix/types";
import paginate from "mongoose-paginate-v2";

const ConsultationSchema = new Schema<ConsultationDef>(
  {
    checkInType: {
      type: String,
      required: true,
      enum: {
        values: consultationCheckInTypes,
        message: "invalid value for `checkInType`: {VALUE}",
      },
    },
    consultationType: {
      type: String,
      required: true,
      enum: {
        values: consultationTypes,
        message: "invalid value for `consultationType`: {VALUE}",
      },
    },
    priority: {
      type: String,
      required: true,
      enum: {
        values: consultationPriorityTypes,
        message: "invalid value for `priority`: {VALUE}",
      },
    },
    patientId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
ConsultationSchema.plugin(paginate);

export const ConsultationModel = model<
  ConsultationDef,
  PaginateModel<ConsultationDef>
>("Consultations", ConsultationSchema);
