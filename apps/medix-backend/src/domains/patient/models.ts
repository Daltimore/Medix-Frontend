import { PatientDef, genders, maritalStatuses } from "@medix/types";
import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { generateNameSchema } from "../../utils";

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
    email: {
      type: String,
      validate: [isEmail, "a valid email address is required"],
    },
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
  },
  {
    timestamps: true,
  }
);

export const PatientModel = model("Patients", PatientSchema);
