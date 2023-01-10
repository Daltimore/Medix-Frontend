import { Router } from "express";
import { createHospitalMemberOfStaff } from "../auth";
import { connectToDb } from "../../database";

export const router = Router();

// TODO: add auth middleware

router.post("/users", async (req, res) => {
  const { tenant, profile } = req.body;
  if (!tenant || !profile)
    return res.status(406).send({
      message: "`tenant` and `profile` are required fields",
    });

  await connectToDb(tenant);

  try {
    res.send((await createHospitalMemberOfStaff(profile)).toJSON());
  } catch (err) {
    res
      .status(406)
      .send({ message: new Error(err as string | undefined).message });
  }
});
