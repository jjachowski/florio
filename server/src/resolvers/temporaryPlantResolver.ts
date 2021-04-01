import { Arg, FieldResolver, Int, Query, Resolver, Root } from 'type-graphql';
import { TemporaryPlant } from '../entities/TemporaryPlant';

@Resolver(TemporaryPlant)
export class TemporaryPlantResolver {
  @FieldResolver(() => String)
  descriptionSnippet(@Root() root: TemporaryPlant) {
    let snippet = root.description.slice(0, 100);
    if (root.description.length > 100) {
      snippet = snippet + '...';
    }
    return snippet;
  }

  @Query(() => [TemporaryPlant])
  async temporaryPlants(): Promise<TemporaryPlant[]> {
    const temporaryPlants = await TemporaryPlant.find();
    return temporaryPlants;
  }

  @Query(() => TemporaryPlant, { nullable: true })
  async temporaryPlant(
    @Arg('id', () => Int) id: number
  ): Promise<TemporaryPlant | undefined> {
    const plant = await TemporaryPlant.findOne(id);

    return plant;
  }
}
