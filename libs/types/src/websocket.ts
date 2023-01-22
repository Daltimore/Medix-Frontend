import { ConsultationDef } from "./consultation";

export interface WebSocketRequestDef {
  authorization: string;
}

export const webSocketPaths = [
  { path: "/consultations/awaiting", body: Array<ConsultationDef> },
] as const;

export type WebSocketResponseDef = typeof webSocketPaths[number];
