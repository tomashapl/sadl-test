import {FieldResolver, Resolver, Root} from "type-graphql";
import { CarModel, CarModelReservation } from "../models/car.model";

@Resolver(() => CarModel)
class CarModelResolver {
  @FieldResolver(() => [CarModelReservation])
  async reservations(@Root() carModel: CarModel) {
    return Object.keys(carModel.reservations).map(key => ({
      id: key,
      from: new Date(carModel.reservations[key].from),
      to: new Date(carModel.reservations[key].to)
    }))
  }
}

export { CarModelResolver };
