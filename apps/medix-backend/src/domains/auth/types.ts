import { UserDef } from "@medix/types";

export interface RefreshTokenPayload {
  userId: string;
  scope: Scope;
}

export const scopes = [
  "hospital-admin",
  "medix-admin",
  "hospital-medic",
] as const;

export type Scope = typeof scopes[number];

export interface AccessTokenPayload {
  user: UserDef;
  scope: Scope;
}
