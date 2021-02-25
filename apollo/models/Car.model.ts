import { Field, ObjectType } from "type-graphql";

@ObjectType()
class CarModel {
  @Field(() => String)
  brand: string;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  fuel: string;
}

export { CarModel };
