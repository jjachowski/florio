import { ObjectType, Field } from 'type-graphql';
import { OptimalConditions } from '../../entities/OptimalConditions';
import { FieldError } from '../../shared/graphqlTypes';

@ObjectType()
export class OptimalConditionsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => OptimalConditions, { nullable: true })
  optimalConditions?: OptimalConditions;
}
