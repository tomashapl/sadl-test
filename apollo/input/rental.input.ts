import { Field, InputType } from "type-graphql";

@InputType()
class RentalInput {
  @Field()
  subjectID: number;

  @Field()
  rentalFrom: Date;

  @Field()
  rentalTo: Date;
}

export { RentalInput };
