import { Schema, model } from "mongoose";

const InvalidatedRefreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

export const InvalidatedRefreshTokenModel = model(
  "InvalidatedRefreshTokens",
  InvalidatedRefreshTokenSchema
);
