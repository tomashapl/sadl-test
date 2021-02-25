import { Field, ObjectType } from "type-graphql";
import { CarModel } from "./car.model";

@ObjectType()
class CarModelModel {
  @Field(() => [CarModel], {
    nullable: true,
  })
  kodiaq: CarModel[];
}

export { CarModelModel };
