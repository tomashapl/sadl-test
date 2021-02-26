import { destroyCookie } from "nookies";
import {
  REFRESH_TOKEN_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from "./storeAuthorization";

const removeAuthorization = (ctx?) => {
  destroyCookie(ctx, TOKEN_STORAGE_KEY, {
    path: "/",
  });
  destroyCookie(ctx, REFRESH_TOKEN_STORAGE_KEY, {
    path: "/",
  });
};

export default removeAuthorization;
