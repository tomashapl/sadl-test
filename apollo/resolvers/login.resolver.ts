import {Arg, Mutation, Resolver} from "type-graphql";
import { SessionModel } from "../models/session.model";
import { LoginInput } from "../input/login.input";
import fetch from "../fetch"

@Resolver((of) => SessionModel)
class LoginResolver {
  @Mutation(() => SessionModel)
  async login(@Arg("values") params: LoginInput) {

    const doLogin = await fetch("/sessions", {
      method: "post",
      body: JSON.stringify(params)
    })

    return await doLogin.json()

  }
}

export { LoginResolver };
