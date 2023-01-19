import { DepartmentDef, MedicProfileTypeDef, UserDef } from "@medix/types";
import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { generateNameSchema } from "../../utils";

const UserSchema = new Schema<UserDef>(
  {
    department: String,
    firstName: generateNameSchema("firstName"),
    lastName: generateNameSchema("lastName"),
    username: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "`email` is a required field"],
      validate: [isEmail, "a valid email address is required"],
    },
    otherNames: {
      type: [String],
      default: [],
    },
    password: String,
    profileType: {
      type: String,
      required: [true, `\`profileType\` is a required field`],
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

export const UserModel = model("Users", UserSchema);

const DepartmentSchema = new Schema<DepartmentDef>({
  name: {
    type: String,
    required: [true, "`name` is a required field"],
  },
});

export const DepartmentModel = model("Departments", DepartmentSchema);

const ProfileTypeSchema = new Schema<MedicProfileTypeDef>({
  name: {
    type: String,
    required: [true, "`name` is a required field"],
  },
  consultationFee: {
    type: Number,
    min: [0, "`consultationFee` cannot be less than 0"],
  },
});

export const MedicProfileTypeModel = model(
  "MedicProfileTypes",
  ProfileTypeSchema
);
