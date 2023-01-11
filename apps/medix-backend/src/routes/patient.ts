import { Router } from "express";
import { authMiddleware } from "../middleware";
import { requireHospitalAuth } from "../middleware/index";
import { PatientDef } from "@medix/types";
import { PatientModel } from "../domains/patient";
import { switchToRequestTenantDb } from "../utils";

export const patientRouter = Router();

const auth = [authMiddleware, requireHospitalAuth];

patientRouter.post("/", ...auth, async (req, res) => {
  await switchToRequestTenantDb(req);
  const payload = req.body as Partial<PatientDef>;
  const patient = new PatientModel({ ...payload });
  patient.save();
  return res.send(patient.toJSON());
});

patientRouter.get("/", ...auth, async (req, res) => {
  try {
    await switchToRequestTenantDb(req);
    return res.send(await PatientModel.find({}));
  } catch (err) {
    return res.status(500).send({
      message: new Error(err as string | undefined).message,
    });
  }
});

patientRouter.get("/:id", ...auth, async (req, res) => {
  try {
    await switchToRequestTenantDb(req);
    const patient = await PatientModel.findById(req.params["id"]);
    if (!patient)
      return res.status(404).send({
        message: "No patient found",
      });
    return res.send(patient);
  } catch (err) {
    return res.status(500).send({
      message: new Error(err as string | undefined).message,
    });
  }
});
