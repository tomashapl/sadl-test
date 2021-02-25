import { createParamDecorator } from "type-graphql";
import { IApolloContext } from "../apolloContext";

export default function () {
  return createParamDecorator<IApolloContext>(({ context }) => context.token);
}
