import withApollo from "next-with-apollo";
import fetch from "isomorphic-unfetch";
import { from, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import getAuthorization from "../src/helpers/getAuthorization";
import { refreshToken } from "./refreshToken";
import promiseToObservable from "./promiseToObservable";
import { GRAPHQL_ERRORS } from "../src/enums";

export const getGqlUrl = (headers) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  return process.browser
    ? `${protocol}://${window.location.host}/api/graphql`
    : `${protocol}://${headers.host}/api/graphql`;
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case GRAPHQL_ERRORS.UNAUTHENTICATED:
          promiseToObservable(refreshToken(operation)).flatMap(() =>
            forward(operation)
          );
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
