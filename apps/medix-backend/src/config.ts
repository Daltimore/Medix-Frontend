import { config as loadEnvVars } from "dotenv";
import { join as joinPaths } from "path";

loadEnvVars({
  path: joinPaths(__dirname, "../.env"),
});

export const config = (() => ({
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_TTL: "15m",
  REFRESH_TOKEN_TTL: "1d",
}))();
