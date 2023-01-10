import { join as joinPaths } from "path";
import {
  Express,
  json as expressJson,
  urlencoded as expressUrlEncoded,
  static as expressStatic,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserDef } from "@medix/types";
import { AccessTokenPayload, Scope, scopes } from "../domains/auth/types";

export class RequestContext {
  public user?: UserDef;
  public scope?: typeof scopes[number];
  public tenant?: string;

  private static _bindings = new WeakMap<Request, RequestContext>();

  public static bind(req: Request) {
    RequestContext._bindings.set(req, new RequestContext());
  }

  public static get(req: Request) {
    return RequestContext._bindings.get(req);
  }
}

const context = (req: Request, _: Response, next: NextFunction) => {
  RequestContext.bind(req);
  next();
};

export const addMiddleware = (app: Express) => {
  app.use(
    cors({
      origin: (_, callback) => callback(null, true), // TODO: restrict origins later
      credentials: true,
    })
  );

  app.use(morgan("dev"));

  app.use(expressJson());

  app.use(expressUrlEncoded({ extended: false }));

  app.use(cookieParser());

  app.use(expressStatic(joinPaths(__dirname, "../../public")));

  app.use(context);

  // for dev: simulate getting tenant from hostname
  app.use((req, _, next) => {
    RequestContext.get(req)!.tenant = "upth-ph";
    next();
  });
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    (req.headers.authorization &&
    req.headers.authorization.split(" ").length > 0
      ? req.headers.authorization.split(" ")[1]
      : false);

  if (!token)
    return res.status(403).send("A token is required for authentication");

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET!) as AccessTokenPayload;
    console.log(decoded);
    RequestContext.get(req)!.user = decoded.user;
    RequestContext.get(req)!.scope = decoded.scope;
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      message: `Invalid access token`,
    });
  }

  return next();
};

export const requireScope = (scopes: Array<Scope> | Scope) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !RequestContext.get(req)!.scope ||
      ![scopes].flat(Infinity).includes(RequestContext.get(req)!.scope!)
    )
      return res.status(403).send({
        message: `You do not have sufficient permissions to access this resource`,
      });
    return next();
  };
};
