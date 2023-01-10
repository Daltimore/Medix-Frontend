import { UserDef } from "@medix/types";
import { Schema, SchemaDefinitionProperty, model } from "mongoose";
import isEmail from "validator/lib/isEmail";

const generateNameSchema = (
  field: string
): SchemaDefinitionProperty<string> => ({
  type: String,
  required: [true, `\`${field}\` is a required field`],
  maxlength: [64, `\`${field}\` cannot be more than 64 characters long`],
});

export const UserSchema = new Schema<UserDef>(
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
