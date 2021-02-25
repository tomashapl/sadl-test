import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { LoginResolver } from "./resolvers/login.resolver";

export const schema = buildSchemaSync({
  resolvers: [LoginResolver],
});
