import {Arg, Mutation, Query, Resolver} from "type-graphql";
import fetchFromFirebase from "../helpers/fetchFromFirebase";
import { CarModelModel } from "../models/carModel.model";
import { CarModel } from "../models/car.model";
import authFetch from "../authFetch";
import Token from "../decorators/Token";
import {ApolloError} from "apollo-server-errors";

@Resolver(() => CarModelModel)
class CarTypeResolver {

    @Query(() => [CarModel])
    async cars(@Token() token: string) {
        const cars = await authFetch("/cars", {}, token)
        return await cars.json()
    }

    @Query(() => CarModel)
    async car(@Token() token: string, @Arg("id") id: number) {
        const cars = await authFetch("/cars", {}, token)
        const allCars = await cars.json()

        const car = allCars.find(x => x.id === id)

        if(!car) {
            throw new ApolloError("Not found", "404")
        }

        return car
    }


  @Query(() => CarModelModel)
  async carsFromFirebase() {
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
