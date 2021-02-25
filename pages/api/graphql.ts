import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import { IApolloContext } from "../../apollo/apolloContext";

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }): IApolloContext => {
    const token = req.headers.authorization;

    return { req, res, token: typeof token !== "undefined" && token };
  },
  playground: true,
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
