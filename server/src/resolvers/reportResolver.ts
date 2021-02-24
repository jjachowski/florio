import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Plant } from '../entities/Plant';
import { PlantReport } from '../entities/PlantReport';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { ReportedPlantResponse } from './types/ReportedPlantResponse';

@Resolver()
export class ReportResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async reportPlant(
    @Arg('plantId', () => Int!) plantId: number,
    @Arg('reason', () => String!) reason: string,
    @Ctx() { req }: MyContext
  ) {
    const plant = await Plant.findOne(plantId);
    if (!plant) {
      return false;
    }

    const report = PlantReport.create({
      creatorId: req.session.userId,
      plantId: plant.id,
      reason: reason,
    });
    plant.isReported = true;

    await report.save();
    await plant.save();

    return true;
  }

  @Query(() => [ReportedPlantResponse])
  @UseMiddleware(isAuth)
  async reportedPlants(): Promise<ReportedPlantResponse[]> {
    const reports = await PlantReport.find({ relations: ['plant', 'creator'] });

    const reportedPlants = reports.map((r) => {
      return {
        plant: r.plant,
        reason: r.reason,
        reportedBy: r.creator,
      } as ReportedPlantResponse;
    });

    return reportedPlants;
  }
}
