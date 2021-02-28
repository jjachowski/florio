import { Field, Int, ObjectType } from 'type-graphql';
import { Plant } from '../../entities/Plant';
import { PlantReport } from '../../entities/PlantReport';
import { User } from '../../entities/User';

@ObjectType()
export class ReportedPlantResponse {
  @Field(() => Plant)
  plant!: Plant;

  @Field(() => PlantReport)
  report!: PlantReport;
}
