import {FieldResolver, Resolver, Root} from "type-graphql";
import { CarModel, CarModelReservation } from "../models/car.model";
import fetchFromFirebase from "../helpers/fetchFromFirebase";

@Resolver(() => CarModel)
class CarModelResolver {
  @FieldResolver(() => [CarModelReservation])
  async reservations(@Root() carModel: CarModel) {

    const reservations = await fetchFromFirebase(`/cars/${carModel.model.toLocaleLowerCase()}/${carModel.id}/reservations`, "value")

    return Object.keys(reservations).map(key => ({
      id: key,
      from: new Date(reservations[key].from),
      to: new Date(reservations[key].to)
    }))
  }
}

export { CarModelResolver };
