import {
  PatientDef,
  bloodGroups,
  genders,
  genotypes,
  maritalStatuses,
  NextOfKinDef,
  PatientVitalsDef,
  temperatureUnits,
} from "@medix/types";
import { Schema, model } from "mongoose";
import { generateEmailSchema, generateNameSchema } from "../../utils";

const PatientSchema = new Schema<PatientDef>(
  {
    address: String,
    age: {
      type: Array,
      length: 2,
      required: false,
      validate: {
        message: "invalid format for field `age`",
        validator(v: any) {
          if (!Array.isArray(v)) return false;
          if (v.length > 0) {
            if (v.length !== 2) return false;
            if (typeof v[0] !== "number") return false;
            if (typeof v[1] !== "string") return false;
          }
          return true;
        },
      },
    },
    dateOfBirth: Date,
    email: generateEmailSchema(),
    firstName: generateNameSchema("firstName"),
    lastName: generateNameSchema("lastName"),
    gender: {
      type: String,
      enum: {
        values: genders,
        message: "invalid value for field `gender`: {VALUE}",
      },
    },
    maritalStatus: {
      type: String,
      enum: {
        values: maritalStatuses,
        message: "invalid value for field `maritalStatus`: {VALUE}",
      },
    },
    otherName: {
      type: String,
      maxlength: 64,
    },
    // TODO: consider using E.164 numbers
    primaryPhoneNumber: {
      type: String,
    },
    title: String,
    bloodGroup: {
      type: String,
      enum: {
        values: bloodGroups,
        message: "invalid value for field `bloodGroup`: {VALUE}",
      },
    },
    genotype: {
      type: String,
      enum: {
        values: genotypes,
        message: "invalid value for field `genotype`: {VALUE}",
      },
    },
    isReferredPatient: {
      type: Boolean,
      default: false,
    },
    referrerId: String,
    nextOfKin: new Schema<NextOfKinDef>({
      email: generateEmailSchema(),
      name: {
        type: String,
        required: [true, "next-of-kin's name is required"],
        maxlength: 194, // each 'name' is allowed 64 chars: 194 allows for three names and two spaces
      },
      phone: {
        type: String,
        required: [true, "next-of-kin's phone number is required"],
      },
      relationship: {
        type: String,
        required: [true, "relationship with next-of-kin is required"],
        maxlength: 20,
      },
    }),
    vitals: new Schema<PatientVitalsDef>({
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
  },
  {
    timestamps: true,
  }
);

export const PatientModel = model("Patients", PatientSchema);
