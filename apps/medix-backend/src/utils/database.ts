import { Request } from "express";
import { SchemaDefinitionProperty } from "mongoose";
import { connectToDb } from "../database";
import { getRequestTenant } from "./network";
import isEmail from "validator/lib/isEmail";

export const generateNameSchema = (
  field: string
): SchemaDefinitionProperty<string> => ({
  type: String,
  required: [true, `\`${field}\` is a required field`],
  maxlength: [64, `\`${field}\` cannot be more than 64 characters long`],
});

export const generateEmailSchema = (): SchemaDefinitionProperty<string> => ({
  type: String,
  validate: [isEmail, "a valid email address is required"],
});

export const switchToRequestTenantDb = (req: Request) => {
  const tenant = getRequestTenant(req);
  if (!tenant) throw new Error("`tenant` not in auth claims");
  return connectToDb(tenant);
};
