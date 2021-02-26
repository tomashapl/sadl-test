import fetch from "../fetch"
import {Arg, Mutation, Resolver} from "type-graphql";
import { SessionModel } from "../models/session.model";
import { LoginInput } from "../input/login.input";
import {AuthModel} from "../models/auth.model";

@Resolver((of) => SessionModel)
class SessionResolver {

    @Mutation(() => AuthModel)
    async refreshToken(@Arg("refreshToken") refreshToken: string) {
        const refresh = await fetch("/sessions/refresh", {
            method: "POST",
            body: JSON.stringify({
                refreshToken
            })
        })
        console.log(refresh)
    }

    @Mutation(() => SessionModel)
    async login(@Arg("values") params: LoginInput) {
        const doLogin = await fetch("/sessions", {
            method: "post",
            body: JSON.stringify(params)
        })

        return await doLogin.json()
    }
}

export { SessionResolver };
