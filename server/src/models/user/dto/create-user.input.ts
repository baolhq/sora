import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  display_name: string;

  @Field()
  email: string;
}
