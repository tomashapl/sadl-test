import { default as isomorphicUnfetch } from "isomorphic-unfetch";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import parseValidationErrors from "./helpers/parseValidationErrors";

const BASE_URL = "https://digilab.herokuapp.com";

const fetch = async (URL: string, params: any) => {
  const request = await isomorphicUnfetch(`${BASE_URL}${URL}`, {
    ...params,
    headers: {
      ...params.headers,
      "content-type": "application/json",
    },
  });

  const response = await request.json();

  if (request.status === 400 && response.type === "Validation") {
    throw new UserInputError(response.message, {
      invalidArgs: parseValidationErrors(response.errors),
    });
  }

  if (request.status === 401) {
    throw new AuthenticationError(request.statusText);
  }

  if (request.status !== 200 && request.status !== 201) {
    throw new Error(response.message);
  }

  return {
    json: async () => response,
  };
};

export default fetch;
