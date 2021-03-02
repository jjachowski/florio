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
import { ReportVote } from '../entities/ReportVote';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { ReportedPlantResponse } from './types/ReportedPlantResponse';

@Resolver()
export class ReportResolver {
  @Mutation(() => Boolean)
  async vote(
    @Arg('reportId', () => Int!) reportId: number,
    @Arg('voteValue', () => Int!) voteValue: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const realVoteValue = voteValue >= 1 ? 1 : -1;
    const reportToVote = await PlantReport.findOne(reportId);

    if (!reportToVote) {
      return false;
    }

    const existingVote = await ReportVote.findOne({
      where: {
        creatorId: req.session.userId,
        reportId,
      },
    });

    if (existingVote && existingVote.value === realVoteValue) {
      console.log('first');

      return true;
    } else if (existingVote && existingVote.value !== realVoteValue) {
      console.log('second');

      existingVote.value = realVoteValue;
      console.log('before: ', reportToVote.score);
      console.log('after: ', reportToVote.score + 2 * realVoteValue);

      reportToVote.score = reportToVote.score + 2 * realVoteValue;
      existingVote.save();
    } else {
      console.log('else');

      const rate = ReportVote.create({
        creatorId: req.session.userId,
        reportId: reportToVote.id,
        plantId: reportToVote.plantId,
        value: realVoteValue,
      });
      reportToVote.score = reportToVote.score + realVoteValue;
      await rate.save();
    }

    reportToVote.save();
    return true;
  }

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
        report: r,
      } as ReportedPlantResponse;
    });

    return reportedPlants;
  }
}
