import { Field, ObjectType, registerEnumType } from "type-graphql";
import { CarModel } from "./car.model";

enum RENTAL_STATUS {
  APPROVED = "approved",
  PENDING = "pending",
  REJECTED = "rejected",
  FINISHED = "finished",
  WAITING = "waiting",
}

registerEnumType(RENTAL_STATUS, {
  name: "RentalStatus",
});

@ObjectType()
class RentalModel {
  @Field()
  from: Date;

  @Field()
  to: Date;

  @Field()
  subjectId: number;

  @Field(() => RENTAL_STATUS)
  status: RENTAL_STATUS;

  car: CarModel;
}

export { RentalModel };
