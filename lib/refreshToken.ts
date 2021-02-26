import fetch from "isomorphic-unfetch";

import { RefreshTokenDocument } from "../src/generated/graphql";
import storeAuthorization from "../src/helpers/storeAuthorization";
import removeAuthorization from "../src/helpers/removeAuthorization";

export const refreshToken = async (operation) => {
  const oldHeaders = operation.getContext().headers;

  const refreshRequest = await fetch(operation.getContext().response.url, {
    method: "POST",
    body: JSON.stringify({
      variables: {
        refreshToken: oldHeaders.refreshToken,
      },
      query: RefreshTokenDocument,
    }),
  });

  const { data } = await refreshRequest.json();

  const refreshedData = data.refresh;

  if (refreshedData) {
    storeAuthorization(refreshedData.token, refreshedData.refreshToken);
  } else {
    removeAuthorization();
  }
};
