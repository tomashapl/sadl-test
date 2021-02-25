import { Field, InputType } from "type-graphql";

@InputType()
class RegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

export { RegisterInput };
