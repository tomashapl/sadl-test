import fetch from "../fetch"
import { Arg, Mutation, Resolver } from "type-graphql";
import { SessionModel } from "../models/session.model";
import { RegisterInput } from "../input/register.input";

@Resolver((of) => SessionModel)
class RegisterResolver {
  @Mutation((of) => SessionModel)
  async register(@Arg("values") values: RegisterInput) {

    // FIXME: Api returns 201 in case when user is successfully registered instead of 200 - fix API or adjust documentation
    const doRegister = await fetch("/users", {
      method: "POST",
      body: JSON.stringify(values),
    });

    return await doRegister.json()

  }
}

export { RegisterResolver }