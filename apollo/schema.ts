import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { CarTypeResolver } from "./resolvers/carType.resolver";
import { CarModelResolver } from "./resolvers/carModel.resolver";
import { SessionResolver } from "./resolvers/session.resolver";
import { RegisterResolver } from "./resolvers/register.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { RentalResolver } from "./resolvers/rental.resolver";

export const schema = buildSchemaSync({
  resolvers: [
    RegisterResolver,
    SessionResolver,
    UserResolver,
    CarModelResolver,
    CarTypeResolver,
    RentalResolver,
  ],
  dateScalarMode: "isoDate",
});
