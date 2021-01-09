import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { OptimalConditions } from '../entities/OptimalConditions';
import { Plant } from '../entities/Plant';
import { PlantName } from '../entities/PlantName';
import { PlantFieldsInput, PlantResponse } from './PlantExtras';

@Resolver(Plant)
export class PlantResolver {
  @Query(() => [Plant])
  async plants(): Promise<Plant[]> {
    const plants = await Plant.find();
    console.log(plants);

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

  @Mutation(() => PlantResponse)
  async addPlant(
    @Arg('data') data: PlantFieldsInput
    // @Arg('primaryName') primaryName: string,
    // @Arg('otherNames', () => [String]) otherNames: string[],
    // @Arg('description') description: string,
    // @Arg('imageUrl') imageUrl: string,
    // @Arg('characteristics', () => [String]) characteristics: string[]
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
        airHumidity,
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
          airHumidity,
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
