export const profileTypes = ["Administrator"] as const;

export interface UserDef {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  otherNames?: Array<string>;
  email: string;
  department?: string;
  password?: string;
  profileType: typeof profileTypes[number];
  createdAt: Date;
  updatedAt: Date;
  tenant: string;
}

export interface UserSignInPayloadDef {
  email?: string;
  username?: string;
  password: string;
  tenant: string;
}
