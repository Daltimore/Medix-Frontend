import { Request } from "express";
import { RequestContext } from "../middleware";

export const getRequestTenant = (req: Request) =>
  RequestContext.get(req)!.tenant;
