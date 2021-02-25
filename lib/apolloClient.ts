import withApollo from "next-with-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export default withApollo(({ ctx, headers, initialState }) => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    uri: "/api/graphql",
    cache: new InMemoryCache().restore(initialState || {}),
  });
});
