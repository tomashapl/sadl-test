import { Field, Float, ObjectType, registerEnumType } from "type-graphql";

enum TYPE {
  SUV = "SUV",
}

registerEnumType(TYPE, {
  name: "Type",
});

@ObjectType()
class CarModelLocation {
  @Field(() => Float)
  latitude: number;
  @Field(() => Float)
  longitude: number;
}

@ObjectType()
class CarModelReservation {
  @Field()
  id: number;

  @Field()
  from: Date;

  @Field()
  to: Date;
}

@ObjectType()
class CarModel {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  brand: string;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  fuel: string;

  @Field(() => TYPE)
  type: TYPE;

  @Field(() => String)
  groupId: string;

  @Field(() => CarModelLocation)
  location: CarModelLocation;

  @Field(() => String)
  imageURL: string;

  @Field(() => Float)
  pricePerDay: number;

  @Field(() => String)
  registrationPlate: string;

  reservations: CarModelReservation[];

  @Field()
  status: string;

  @Field()
  subjectTypeId: number;

  @Field()
  year: string;
}

export { CarModel, CarModelReservation };
