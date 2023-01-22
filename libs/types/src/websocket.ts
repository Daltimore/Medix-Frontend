import { PaginateResult } from "./database";
import { GetConsultationsResponse } from "./responses";

export type HandshakePayload = {
  authorization: string;
  action: "handshake";
  tenant: string;
};

export type WebSocketRequestDef =
  | HandshakePayload
  | {
      path: "/consultations/awaiting" | "/consultations/assigned-to-me";
    };

export type WebSocketResponseDef =
  | {
      path: "/consultations/awaiting";
      body: PaginateResult<GetConsultationsResponse>;
    }
  | {
      path: "/consultations/assigned-to-me";
      body: PaginateResult<GetConsultationsResponse>;
    };
