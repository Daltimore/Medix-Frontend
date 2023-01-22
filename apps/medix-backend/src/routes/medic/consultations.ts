import { Router } from "express";
import {
  RequestContext,
  authMiddleware,
  requireHospitalAuth,
} from "~/middleware";
import { connectToDb } from "~/database";
import { ConsultationModel, getConsultations } from "~/domains/consultation";
import { switchToRequestTenantDb } from "../../utils/database";
import { publishMessageToUsers } from "~/websocket";
import { UserModel } from "~/domains/user";

const router = Router({ mergeParams: true });
const auth = [authMiddleware, requireHospitalAuth];

const publishConsultationsToSubscribers = async () => {
  const userIds = (await UserModel.find()).map((user) => user._id.toString());
  console.log("userIds =>", userIds);

  publishMessageToUsers(userIds, {
    path: "/consultations/awaiting",
    body: await getConsultations(),
  });

  for (const id of userIds) {
    publishMessageToUsers([id], {
      path: "/consultations/assigned-to-me",
      body: await getConsultations({}, id),
    });
  }
};

// TODO: restrict access further
router.get("/", ...auth, async (req, res) => {
  const ctx = RequestContext.get(req);

  await connectToDb(ctx?.tenant!);

  try {
    const docs = await getConsultations(req.query);
    return res.send(docs);
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
    await publishConsultationsToSubscribers();

    return res.send(consultation);
  } catch (err) {
    return res.status(406).send({
      message: new Error(String(err)).message,
    });
  }
});

router.put("/:id", ...auth, async (req, res) => {
  await switchToRequestTenantDb(req);

  try {
    const updateRes = await ConsultationModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    if (!updateRes)
      return res.status(404).send({
        message: "Consultation not found",
      });

    await publishConsultationsToSubscribers();

    return res.send({ ...updateRes.toJSON(), ...req.body });
  } catch (err) {
    return res.status(406).send({
      message: (err as Error).message,
    });
  }
});

export default router;
