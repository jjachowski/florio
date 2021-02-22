import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class PlantName {
  @Field(() => Int)
  plantId: number;
  @Field()
  name: string;
}
