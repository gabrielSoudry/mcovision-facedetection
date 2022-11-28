import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'email of the user' })
  email: string;
  // TODO HASH AND SALT PASSWORdD !
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
