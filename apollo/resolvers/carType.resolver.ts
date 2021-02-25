import { Query, Resolver } from "type-graphql";
import fetchFromFirebase from "../helpers/fetchFromFirebase";
import { CarModelModel } from "../models/carModel.model";

@Resolver(() => CarModelModel)
class CarTypeResolver {
  @Query(() => CarModelModel)
  async cars() {
    const getCars = await fetchFromFirebase<CarModelModel>("/cars", "value");

    return Object.entries(getCars).reduce(
      (acc, [model, params]) => ({
        ...acc,
        [model]: Object.values(params),
      }),
      {}
    );
  }
}

export { CarTypeResolver };
