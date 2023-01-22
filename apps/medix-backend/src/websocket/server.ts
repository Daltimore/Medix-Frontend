import { IncomingMessage, ServerResponse, Server as HttpServer } from "http";
import { Server, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import {
  WebSocketRequestDef,
  WebSocketResponseDef,
  HandshakePayload,
} from "@medix/types/dist";
import { AccessTokenPayload } from "~/domains/auth/types";
import { getConsultations } from "~/domains/consultation";
import { connectToDb } from "~/database";

export let ws: Server;

type CacheEntry = { userId: string; tenant: string };

const clients: Map<WebSocket, CacheEntry> = new Map();

const findClientByUserId = (id: string) => {
  const found = (
    Array.from(clients.entries()) as Array<[WebSocket, CacheEntry]>
  ).find(([_, { userId }]) => id === userId);
  return found ? found[0] : null;
};

const isHandshake = (body: WebSocketRequestDef): body is HandshakePayload => {
  const b = body as any;
  return b.authorization && b.action === "handshake";
};

export const startWsServer = (
  restServer: HttpServer<typeof IncomingMessage, typeof ServerResponse>
) => {
  ws = new Server({
    server: restServer,
  });
  console.log("ws address =>", ws.address());

  ws.on("connection", (req) => {
    console.log("connected");

    req.on("close", () => {
      clients.delete(req);
    });

    req.on("message", async (data) => {
      const body: WebSocketRequestDef = JSON.parse(data.toString());
      console.log("WS received =>", body);

      if (isHandshake(body)) {
        const decodedAuth = jwt.decode(
          body.authorization
        ) as AccessTokenPayload;

        const id: string = decodedAuth?.user?._id;
        const tenant: string = body.tenant;

        if (!id || !tenant)
          return req.send(
            JSON.stringify({
              error: "Unauthorised",
            })
          );

        clients.set(req, {
          tenant,
          userId: id,
        });
        req.send(
          JSON.stringify({
            message: "Handshake acknowledged",
          })
        );
        return;
      }

      const { userId, tenant } = clients.get(req) ?? {};
      if (!userId || !tenant)
        return req.send(
          JSON.stringify({
            error: "Unauthorised",
          })
        );
      console.log("user ID ===>", userId);
      console.log("tenant ===>", tenant);

      await connectToDb(tenant);

      switch ((body as WebSocketResponseDef).path) {
        case "/consultations/assigned-to-me":
          publishMessageToUsers([userId], {
            body: await getConsultations(undefined, userId),
            path: "/consultations/assigned-to-me",
          });
          break;
        case "/consultations/awaiting":
          publishMessageToUsers([userId], {
            body: await getConsultations(),
            path: "/consultations/awaiting",
          });
          break;

        default:
          break;
      }
    });
  });
};

export const publishMessageToUsers = (
  userIds: Array<string>,
  message: WebSocketResponseDef
) => {
  userIds
    .map((id) => findClientByUserId(id))
    .forEach((req) => {
      if (!req) return;
      req.send(JSON.stringify(message));
    });
};
