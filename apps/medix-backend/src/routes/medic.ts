import { Router } from "express";
import {
  createAccessToken,
  createHospitalMemberOfStaff,
} from "../domains/auth";
import { authMiddleware, requireScope } from "../middleware";
import { UserSignInPayloadDef } from "@medix/types";
import { UserModel } from "../domains/user/models";
import { Crypt } from "../utils";
import { createRefreshToken } from "../domains/auth/index";
import { connectToDb } from "../database/index";

export const medicRouter = Router();
const requireSysAdmin = requireScope("hospital-admin");
const requireStaffMember = requireScope("hospital-medic");

medicRouter.post("/users", authMiddleware, requireSysAdmin, (req, res) => {
  return res.send(createHospitalMemberOfStaff(req.body));
});

medicRouter.post("/auth", async (req, res) => {
  try {
    const payload: UserSignInPayloadDef = { ...req.body };
    await connectToDb(payload.tenant);
    const cred = payload.email ?? payload.username;
    if (!cred) throw new Error("Invalid credentials!");

    const user = await UserModel.findOne({
      $or: [
        {
          email: cred,
        },
        {
          username: cred,
        },
      ],
    });
    if (!user) throw new Error("Invalid credentials!");
    if (!user.password)
      throw new Error(
        "Cannot be signed in because this account has not been verified!"
      );

    if (!Crypt.compare(payload.password, user.password))
      throw new Error("Invalid credentials!");

    const accessToken = createAccessToken(
      user,
      user.profileType === "Administrator" ? "hospital-admin" : "hospital-medic"
    );
    const refreshToken = createRefreshToken(user._id);

    const { password, ...u } = user.toJSON();

    return res.send({
      profile: { ...u },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(406).send({
      message: new Error(err as string | undefined).message,
    });
  }
});
