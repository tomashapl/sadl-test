import withApollo from "next-with-apollo";
import fetch from "isomorphic-unfetch";
import { from, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import getAuthorization from "../src/helpers/getAuthorization";

export const getGqlUrl = (headers) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  return process.browser
    ? `${protocol}://${window.location.host}/api/graphql`
    : `${protocol}://${headers.host}/api/graphql`;
};

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          return;
      }
    }
  }
});

const authLink = (ctx) =>
  setContext((_, { headers }) => {
    const { token } = getAuthorization(ctx);
    return {
      headers: {
        ...headers,
        authorization: token && token,
      },
    };
  });

export default withApollo(({ ctx, headers, initialState }) => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([
      errorLink,
      authLink(ctx),
      new HttpLink({ uri: getGqlUrl(headers), fetch }),
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
  });
});
