import { UserDef } from "@medix/types";
import { Crypt } from "../../utils";
import { UserModel } from "../user/models";
import jwt from "jsonwebtoken";
import { RefreshTokenPayload, AccessTokenPayload, Scope } from "./types";
import { config } from "../../config";

export const createHospitalMemberOfStaff = async (obj: UserDef) => {
  obj = {
    ...obj,
    password: obj.password ? Crypt.hash(obj.password) : undefined,
  };

  if (!obj.email) throw new Error("A valid email address is required");

  const existingUser = await UserModel.findOne({ email: obj.email });
  if (existingUser)
    throw new Error("A user is already registered with this email");

  const user = new UserModel(obj);
  user.save();

  return user;
};

export const createAccessToken = (user: UserDef, scope: Scope) => {
  const payload: AccessTokenPayload = {
    user,
    scope,
  };
  return jwt.sign({ ...payload }, config.JWT_SECRET!, {
    expiresIn: config.ACCESS_TOKEN_TTL,
  });
};

export const createRefreshToken = (userId: string, scope: Scope) => {
  const payload: RefreshTokenPayload = {
    userId,
    scope,
  };
  return jwt.sign({ ...payload }, config.JWT_SECRET!, {
    expiresIn: config.REFRESH_TOKEN_TTL,
  });
};
