import departments from "./departments";
import users from "./users";
import { Router } from "express";

export const medicRouter = Router();

medicRouter.use("/departments", departments);
medicRouter.use("/", users);
