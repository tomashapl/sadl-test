import { Field, ObjectType } from "type-graphql";

@ObjectType()
class AuthModel {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

export { AuthModel };
