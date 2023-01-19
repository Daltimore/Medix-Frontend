import {
  createAccessToken,
  createHospitalMemberOfStaff,
} from "../../domains/auth";
import {
  RequestContext,
  authMiddleware,
  requireHospitalAuth,
} from "../../middleware";
import { UserDef, UserSignInPayloadDef } from "@medix/types";
import { UserModel } from "../../domains/user/models";
import { Crypt } from "../../utils";
import { createRefreshToken } from "../../domains/auth/index";
import { connectToDb } from "../../database/index";
import { requireSysAdmin } from "../../middleware/index";
import { Router } from "express";

const router = Router();

router.post("/users", authMiddleware, requireSysAdmin, (req, res) => {
  return res.send(createHospitalMemberOfStaff(req.body));
});

router.post("/auth", async (req, res) => {
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

    const scope =
      user.profileType === "Administrator"
        ? "hospital-admin"
        : "hospital-medic";
    const accessToken = createAccessToken(user, scope);
    const refreshToken = createRefreshToken(user._id, scope);

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

router.get(
  "/profile",
  authMiddleware,
  requireHospitalAuth,
  async (req, res) => {
    const ctx = RequestContext.get(req);
    await connectToDb(ctx?.tenant!);
    try {
      return res.send(await UserModel.findById(ctx?.user?._id));
    } catch (err) {
      return res.status(406).send({
        message: new Error(err as string | undefined).message,
      });
    }
  }
);

router.put(
  "/profile",
  authMiddleware,
  requireHospitalAuth,
  async (req, res) => {
    const ctx = RequestContext.get(req);
    await connectToDb(ctx?.tenant!);
    const { _id, password, createdAt, updatedAt, ...payload } =
      req.body as UserDef;
    try {
      const updatedDoc = await UserModel.findByIdAndUpdate(ctx?.user?._id, {
        ...payload,
      });
      if (!updatedDoc)
        throw new Error(
          "Something went wrong and your profile could not be updated"
        );
      return res.send({ ...updatedDoc.toJSON(), ...payload, password: "" });
    } catch (err) {
      return res.status(406).send({
        message: new Error(err as string | undefined).message,
      });
    }
  }
);

router.get("/icheka", (_, res) => {
  res.send({
    hi: "icheka",
  });
});

export default router;
