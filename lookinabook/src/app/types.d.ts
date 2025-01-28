import { NextApiRequest } from "next";

declare module "next" {
  export interface NextApiRequest {
    user?: {
      id: number;
      email: string;
    };
  }
}
