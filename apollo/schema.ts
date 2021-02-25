import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { CarTypeResolver } from "./resolvers/carType.resolver";
import { CarModelResolver } from "./resolvers/carModel.resolver";

export const schema = buildSchemaSync({
  resolvers: [CarModelResolver, CarTypeResolver],
  dateScalarMode: "isoDate",
});
