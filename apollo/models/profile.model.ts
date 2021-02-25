import { Field, ObjectType } from "type-graphql";

@ObjectType()
class ProfileModel {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export { ProfileModel };
