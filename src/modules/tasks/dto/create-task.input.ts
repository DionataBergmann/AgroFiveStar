import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  date: Date;

  @Field({ nullable: true })
  dayOfWeek: number;

  @Field({ nullable: true })
  userName: string;
}
