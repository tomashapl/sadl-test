import { Query, Resolver } from "type-graphql";
import { ProfileModel } from "../models/profile.model";
import Token from "../decorators/Token";
import authFetch from "../authFetch";

@Resolver(ProfileModel)
class UserResolver {
  @Query(() => ProfileModel)
  async user(@Token() token) {
    const profile = await authFetch("/users", {}, token)
    const response = await profile.json()

    return response.data

  }
}

export { UserResolver };
