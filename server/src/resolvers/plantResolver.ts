import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Plant } from '../entities/Plant';
import { PlantName } from '../entities/PlantName';

@ObjectType()
class PlantError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class PlantResponse {
  @Field(() => [PlantError], { nullable: true })
  errors?: PlantError[];

  @Field(() => Plant, { nullable: true })
  plant?: Plant;
}

@Resolver(Plant)
export class PlantResolver {
  @Query(() => [Plant])
  async plants(): Promise<Plant[]> {
    const plants = await Plant.find();
    return plants;
  }

  @Mutation(() => PlantResponse)
  async addPlant(
    @Arg('primaryName') primaryName: string,
    @Arg('otherNames', () => [String]) otherNames: string[],
    @Arg('description') description: string
  ): Promise<PlantResponse> {
    const plant = Plant.create({
      description,
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

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(PlantName)
      .values([...plantNames])
      .execute();

    plant.names = plantNames;

    return { plant };
  }
}
