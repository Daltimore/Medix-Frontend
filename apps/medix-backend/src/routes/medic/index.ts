import departments from "./departments";
import users from "./users";
import consultations from "./consultations";
import { Router } from "express";

export const medicRouter = Router();

medicRouter.use("/departments", departments);
medicRouter.use("/consultations", consultations);
medicRouter.use("/", users);
