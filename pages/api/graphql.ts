import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import firebase from "firebase";

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const token = req.headers.authorization;

    return { req, res, token: token !== "undefined" && token };
  },
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
