import { ObjectType, Field } from 'type-graphql';
import { Plant } from '../../entities/Plant';
import { FieldError } from '../../shared/graphqlTypes';

@ObjectType()
export class PlantResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Plant, { nullable: true })
  plant?: Plant;
}
