import { connect as mongooseConnect } from "mongoose";
import { config } from "../config";

const uri = config.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set!");

const dbNameForbiddenCharactersRegex = /[/\\.\s"$*<>:|?]/g;

const canoniseTenantName = (tenant: string) => {
  return tenant.replace(dbNameForbiddenCharactersRegex, "_").toLowerCase();
};

let retries = 0;

export const connectToDb = async (tenant: string): Promise<void> => {
  try {
    const dbName = canoniseTenantName(`medix-${tenant}`);
    await mongooseConnect(uri.replace("?", `${dbName}?`), {
      serverSelectionTimeoutMS: 1000,
    });
  } catch (err) {
    if (retries > 10) throw err;
    console.log("Failed to connect to Atlas. Retrying...");
    retries++;
    return connectToDb(tenant);
  }
};
