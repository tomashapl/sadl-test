import nookies from "nookies";

import {
  REFRESH_TOKEN_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from "./storeAuthorization";
import { NextPageContext } from "next";

const getAuthorization = (ctx?: NextPageContext) => {
  const cookies = nookies.get(ctx);

  return {
    token: cookies?.[TOKEN_STORAGE_KEY],
    refreshToken: cookies?.[REFRESH_TOKEN_STORAGE_KEY],
  };
};

export default getAuthorization;
