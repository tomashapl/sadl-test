import { Field, ObjectType } from "type-graphql";
import { ProfileModel } from "./profile.model";
import { AuthModel } from "./auth.model";

@ObjectType()
class SessionModel extends AuthModel {
  @Field((of) => ProfileModel)
  profile: ProfileModel;
}

export { SessionModel };
