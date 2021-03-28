import { ObjectType, Field } from 'type-graphql';
import { Plant } from '../../entities/Plant';
import { TemporaryPlant } from '../../entities/TemporaryPlant';
import { FieldError } from '../../shared/graphqlTypes';

@ObjectType()
export class PlantResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Plant, { nullable: true })
  plant?: TemporaryPlant;
}
