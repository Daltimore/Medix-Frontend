import { Router } from "express";
import {
  RequestContext,
  authMiddleware,
  requireHospitalAuth,
} from "~/middleware";
import { connectToDb } from "~/database";
import { ConsultationModel } from "~/domains/consultation";
import { parsePaginationQs } from "~/utils";
import { switchToRequestTenantDb } from "../../utils/database";

const router = Router({ mergeParams: true });
const auth = [authMiddleware, requireHospitalAuth];

// TODO: restrict access further
router.get("/", ...auth, async (req, res) => {
  const ctx = RequestContext.get(req);
  await connectToDb(ctx?.tenant!);
  try {
    return res.send(
      await ConsultationModel.paginate({}, parsePaginationQs(req.query))
    );
  } catch (err) {
    return res.status(500).send({
      message: new Error(String(err)).message,
    });
  }
});

router.post("/", ...auth, async (req, res) => {
  const ctx = RequestContext.get(req)!;
  await switchToRequestTenantDb(req);
  try {
    const consultation = new ConsultationModel({
      ...req.body,
      checkedInBy: ctx.user?._id,
    });
    await consultation.save();
    return res.send(consultation);
  } catch (err) {
    return res.status(406).send({
      message: new Error(String(err)).message,
    });
  }
});

export default router;
