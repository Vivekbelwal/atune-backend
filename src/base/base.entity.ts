import {
  ObjectType,
  ID,
  GraphQLISODateTime,
  InterfaceType,
  Field,
} from '@nestjs/graphql';

@ObjectType()
export class BaseItem {
  @Field(() => ID, { description: 'Unique ID of item' })
  id: string;

  @Field(() => GraphQLISODateTime, { description: "Item's creation date" })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: "Item's update date" })
  updatedAt: Date;
}

@InterfaceType()
export abstract class IBaseItem {
  @Field(() => ID, { description: 'Unique ID of item' })
  id: string;

  @Field(() => GraphQLISODateTime, { description: "Item's creation date" })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: "Item's update date" })
  updatedAt: Date;
}

@ObjectType()
export class ActionResponse {
  @Field({ description: 'Whether request succeeded or not' })
  success: boolean;

  @Field({ description: 'Any message', nullable: true })
  message?: string;
}
