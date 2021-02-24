import { Field, ObjectType } from 'type-graphql';
import { Plant } from '../../entities/Plant';
import { User } from '../../entities/User';

@ObjectType()
export class ReportedPlantResponse {
  @Field(() => Plant)
  plant!: Plant;
  @Field()
  reason!: string;
  @Field(() => User)
  reportedBy!: User;
}
