import { PaginateModel, Schema, model } from "mongoose";
import {
  ConsultationDef,
  PatientVitalsDef,
  consultationCheckInTypes,
  consultationPriorityTypes,
  consultationTypes,
  temperatureUnits,
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
    vitalSigns: new Schema<PatientVitalsDef>({
      pulse: {
        type: Number,
        max: 220,
      },
      respiration: {
        type: Number,
        max: 40,
      },
      temperature: {
        type: Number,
        max: 232,
      },
      temperatureUnit: {
        type: String,
        enum: {
          values: temperatureUnits,
          message: `\`temperatureUnit\` must be one of ${temperatureUnits.join(
            ", "
          )}`,
        },
        default: "C",
      },
    }),
    checkedInBy: {
      type: String,
      required: true,
    },
    hasCompletedVitalSigns: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasStartedVitalSigns: {
      type: Boolean,
      required: true,
      default: false,
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
