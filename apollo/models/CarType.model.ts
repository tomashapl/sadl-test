import { Field, ObjectType } from "type-graphql";
import { CarModel } from "./Car.model";

@ObjectType()
class CarTypeModel {
  @Field(() => [CarModel])
  kodiaq: CarModel[];
}

export { CarTypeModel };
