import jwt from "jsonwebtoken";
import { Router } from "express";
import { RefreshTokenPayload } from "../domains/auth/types";
import { config } from "../config";
import { UserModel } from "../domains/user";
import { connectToDb } from "../database/index";
import { RequestContext } from "../middleware";
import { createAccessToken, createRefreshToken } from "../domains/auth/index";
import { InvalidatedRefreshTokenModel } from "../domains/auth/models";

export const noAuthRoutes = Router();

noAuthRoutes.post("/access-token", async (req, res) => {
  try {
    await connectToDb(RequestContext.get(req)!.tenant!);
    const { refreshToken } = req.body;

    const isInvalidated =
      (await InvalidatedRefreshTokenModel.findOne({ token: refreshToken })) !==
      null;
    if (isInvalidated) throw new Error("Invalid token!");

    const { scope, userId } = jwt.verify(
      refreshToken,
      config.JWT_SECRET!
    ) as RefreshTokenPayload;
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("Invalid token!");

    new InvalidatedRefreshTokenModel({ token: refreshToken }).save();

    return res.send({
      accessToken: createAccessToken(user, scope),
      refreshToken: createRefreshToken(userId, scope),
    });
  } catch (err) {
    return res.status(401).send({
      message: new Error(err as string | undefined).message,
    });
  }
});
