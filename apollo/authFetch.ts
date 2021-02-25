import fetch from "./fetch";

const authFetch = async (URL: string, options, token: string) => {
  return await fetch(URL, {
    ...options,
    headers: {
      Authorization: token,
      ...options.headers,
    },
  });
};

export default authFetch;
