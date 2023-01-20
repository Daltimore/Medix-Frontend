import { Router } from "express";
import {
  RequestContext,
  authMiddleware,
  requireHospitalAuth,
} from "~/middleware";
import { connectToDb } from "~/database";
import { DepartmentModel } from "~/domains/user";

const router = Router({ mergeParams: true });

router.all("/", authMiddleware, requireHospitalAuth, async (req, res) => {
  const ctx = RequestContext.get(req);
  await connectToDb(ctx?.tenant!);
  try {
    return res.send(await DepartmentModel.find());
  } catch (err) {
    return res.status(500).send({
      message: new Error(String(err)).message,
    });
  }
});

export default router;
