import fetch from "./fetch";
import { AuthenticationError } from "apollo-server-micro";

const authFetch = async (URL: string, options, token: string) => {
  const doAuthFetch = await fetch(URL, {
    ...options,
    headers: {
      Authorization: token,
      ...options.headers,
    },
  });

  if (doAuthFetch.request.status === 401) {
    throw new AuthenticationError(doAuthFetch.request.statusText);
  }

  return doAuthFetch;
};

export default authFetch;
