import { Field, ObjectType } from "type-graphql";
import { CarModel } from "./car.model";

@ObjectType()
class RentalModel {
  @Field()
  from: Date;

  @Field()
  to: Date;

  @Field()
  subjectId: number;

  @Field()
  status: string;

  car: CarModel;
}

export { RentalModel };
