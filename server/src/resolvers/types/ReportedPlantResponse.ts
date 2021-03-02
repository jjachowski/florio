import { Field, ObjectType } from 'type-graphql';
import { Plant } from '../../entities/Plant';
import { PlantReport } from '../../entities/PlantReport';

@ObjectType()
export class ReportedPlantResponse {
  @Field(() => Plant)
  plant!: Plant;

  @Field(() => PlantReport)
  report!: PlantReport;
}
