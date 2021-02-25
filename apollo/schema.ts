import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { CarTypeResolver } from "./resolvers/carType.resolver";
import { CarModelResolver } from "./resolvers/carModel.resolver";
import { LoginResolver } from "./resolvers/login.resolver";
import { RegisterResolver } from "./resolvers/register.resolver";
import { UserResolver } from "./resolvers/user.resolver";

export const schema = buildSchemaSync({
  resolvers: [
    RegisterResolver,
    LoginResolver,
    UserResolver,
    CarModelResolver,
    CarTypeResolver,
  ],
  dateScalarMode: "isoDate",
});
