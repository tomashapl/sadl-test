import { Query, Resolver } from "type-graphql";
import fetchFromFirebase from "../helpers/fetchFromFirebase";
import { CarTypeModel } from "../models/CarType.model";

@Resolver()
class LoginResolver {
  @Query(() => CarTypeModel)
  async get() {
    return await fetchFromFirebase("/cars", "value");
  }
}

export { LoginResolver };
