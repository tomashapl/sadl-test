import { Field, ObjectType } from "type-graphql";
import { ProfileModel } from "./profile.model";

@ObjectType()
class SessionModel {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field((of) => ProfileModel)
  profile: ProfileModel;
}

export { SessionModel };
