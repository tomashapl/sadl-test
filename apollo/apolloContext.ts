import { Request, Result } from "apollo-server-micro";

export interface IApolloContext {
  token?: string;
  req: Request;
  res: Result;
}
