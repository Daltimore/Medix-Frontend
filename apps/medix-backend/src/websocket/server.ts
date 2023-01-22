import { IncomingMessage, ServerResponse, Server as HttpServer } from "http";
import { Server, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { WebSocketRequestDef } from "@medix/types";
import { AccessTokenPayload } from "~/domains/auth/types";

export let ws: Server;
const clients = new Map();

const findClientByUserId = (userId: string) => {
  const found = (
    Array.from(clients.entries()) as Array<[WebSocket, string]>
  ).find(([_, id]) => id === userId);
  return found ? found[0] : null;
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

    req.on("message", (data) => {
      const body = JSON.parse(data.toString()) as WebSocketRequestDef;
      console.log("received =>", body);

      const decodedAuth = jwt.decode(body.authorization) as AccessTokenPayload;

      const id = decodedAuth?.user?._id;
      if (!id)
        return req.send(
          JSON.stringify({
            error: "Unauthorised",
          })
        );

      if (!findClientByUserId(id)) clients.set(req, id);
    });
  });
};

export const publishMessageToUsers = <T>(
  userIds: Array<string>,
  message: T
) => {
  userIds
    .map((id) => findClientByUserId(id))
    .forEach((req) => {
      if (!req) return;
      req.send(JSON.stringify(message));
    });
};
