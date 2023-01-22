import { Router } from "express";
import { authMiddleware, requireHospitalAuth } from "~/middleware";
import { PatientDef } from "@medix/types";
import { PatientModel } from "~/domains/patient";
import {
  switchToRequestTenantDb,
  parsePaginationQs,
  generateSearchParams,
} from "~/utils";

export const patientRouter = Router();

const auth = [authMiddleware, requireHospitalAuth];

patientRouter.post("/", ...auth, async (req, res) => {
  await switchToRequestTenantDb(req);
  try {
    const payload = req.body as Partial<PatientDef>;
    const patient = new PatientModel({ ...payload });
    await patient.save();
    return res.send(patient.toJSON());
  } catch (err) {
    return res.status(406).send({
      message: (err as Error).message,
    });
  }
});

patientRouter.post("/search", ...auth, async (req, res) => {
  await switchToRequestTenantDb(req);
  try {
    return res.send(
      await PatientModel.paginate(
        { ...(await generateSearchParams({ ...req.body })) },
        parsePaginationQs(req.query)
      )
    );
  } catch (err) {
    return res.status(406).send({
      message: (err as Error).message,
    });
  }
});

patientRouter.get("/", ...auth, async (req, res) => {
  await switchToRequestTenantDb(req);
  try {
    return res.send(
      await PatientModel.paginate({}, parsePaginationQs(req.query))
    );
  } catch (err) {
    return res.status(500).send({
      message: new Error(err as string | undefined).message,
    });
  }
});

patientRouter.get("/:id", ...auth, async (req, res) => {
  await switchToRequestTenantDb(req);
  try {
    const patient = await PatientModel.findById(req.params["id"]);
    if (!patient)
      return res.status(404).send({
        message: "No patient found",
      });
    return res.send(patient);
  } catch (err) {
    return res.status(406).send({
      message: new Error(err as string | undefined).message,
    });
  }
});

patientRouter.put("/:id", ...auth, async (req, res) => {
  await switchToRequestTenantDb(req);
  try {
    const patientId = req.params["id"];
    const updateRes = await PatientModel.findByIdAndUpdate(patientId, {
      ...req.body,
    });
    if (updateRes === null)
      return res.status(404).send({
        message: "No patient found",
      });
    return res.send({ ...updateRes.toJSON(), ...req.body });
  } catch (err) {
    return res.status(406).send({
      message: new Error(err as string | undefined).message,
    });
  }
});
