import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { OptimalConditions } from '../entities/OptimalConditions';
import { Plant } from '../entities/Plant';
import { PlantName } from '../entities/PlantName';
import { MyContext } from '../types';
import {
  OptimalConditionsInput,
  OptimalConditionsResponse,
  PlantFieldsInput,
  PlantResponse,
} from './PlantExtras';

@Resolver(Plant)
export class PlantResolver {
  @FieldResolver(() => String)
  descriptionSnippet(@Root() root: Plant) {
    let snippet = root.description.slice(0, 100);
    if (root.description.length > 100) {
      snippet = snippet + '...';
    }
    return snippet;
  }

  @Query(() => [Plant])
  async plants(): Promise<Plant[]> {
    const plants = await Plant.find();

    return plants;
  }

  @Query(() => Plant, { nullable: true })
  async plant(@Arg('id', () => Int) id: number): Promise<Plant | undefined> {
    const plant = await Plant.findOne(id);

    return plant;
  }

  @Query(() => [PlantName])
  async plantNames(): Promise<PlantName[]> {
    const plantNames = await PlantName.find();

    return plantNames;
  }

  @Mutation(() => OptimalConditionsResponse)
  async addOptimalConditions(
    @Arg('plantId', () => Int) plantId: number,
    @Arg('data') data: OptimalConditionsInput
  ): Promise<OptimalConditionsResponse> {
    const plant = await Plant.findOne(plantId);
    if (!plant) {
      return {
        errors: [
          { field: 'plantId', message: 'Plant with this id does not exist' },
        ],
      };
    }

    let optimalConditions = await OptimalConditions.findOne({
      plantId: plant.id,
      season: data.season,
    });

    if (optimalConditions) {
      Object.assign(optimalConditions, data);
      optimalConditions.save();
    } else {
      optimalConditions = OptimalConditions.create({
        ...data,
        plantId: plant.id,
      });
      await optimalConditions.save();
    }

    // let optimalConditions;
    // const currentOptimalConditions = plant.optimalConditions.find(
    //   (o) => o.season === data.season
    // );
    // if (currentOptimalConditions !== undefined) {
    //   optimalConditions = currentOptimalConditions;
    //   optimalConditions = {
    //     ...optimalConditions,
    //     ...data,
    //     plantId: plant.id,
    //   } as OptimalConditions;
    //   await plant.save();
    // } else {
    //   optimalConditions = OptimalConditions.create({
    //     ...data,
    //     plantId: plant.id,
    //   });
    //   await optimalConditions.save();
    // }

    return { optimalConditions };
  }

  @Mutation(() => PlantResponse)
  async addPlant(
    @Arg('data') data: PlantFieldsInput,
    @Ctx() { req }: MyContext
  ): Promise<PlantResponse> {
    const {
      description,
      imageUrl,
      primaryName,
      otherNames,
      optimalConditions,
    } = data;

    const plant = Plant.create({
      description,
      imageUrl,
      creatorId: req.session.userId,
    });

    await plant.save();

    const plantNames: PlantName[] = [];
    plantNames.push(
      PlantName.create({
        name: primaryName,
        isPrimary: true,
        plantId: plant.id,
      })
    );

    otherNames.forEach((otherName) =>
      plantNames.push(
        PlantName.create({
          name: otherName,
          isPrimary: false,
          plantId: plant.id,
        })
      )
    );

    const plantConditions: OptimalConditions[] = [];

    optimalConditions.forEach((condition) => {
      const {
        airHumidityLow,
        airHumidityHigh,
        season,
        water,
        sun,
        temperatureLow,
        temperatureHigh,
      } = condition;
      plantConditions.push(
        OptimalConditions.create({
          plantId: plant.id,
          season,
          water,
          sun,
          airHumidityLow,
          airHumidityHigh,
          temperatureLow,
          temperatureHigh,
        })
      );
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(PlantName)
      .values(plantNames)
      .execute();

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(OptimalConditions)
      .values(plantConditions)
      .execute();

    plant.names = plantNames;
    plant.optimalConditions = plantConditions;

    return { plant };
  }
}
