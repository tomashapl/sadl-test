import { setCookie } from "nookies";
import { NextPageContext } from "next";

export const TOKEN_STORAGE_KEY = "sadl.authToken";
export const REFRESH_TOKEN_STORAGE_KEY = "sadl.refreshToken";

const storeAuthorization = (
  token: string,
  refreshToken: string,
  ctx?: NextPageContext
) => {
  setCookie(ctx, TOKEN_STORAGE_KEY, token, {
    path: "/",
  });
  setCookie(ctx, REFRESH_TOKEN_STORAGE_KEY, refreshToken, {
    path: "/",
  });
};

export default storeAuthorization;
