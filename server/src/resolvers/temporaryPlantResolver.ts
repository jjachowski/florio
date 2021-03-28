import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
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
}
