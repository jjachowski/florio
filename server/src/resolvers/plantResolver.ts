import { addResolveFunctionsToSchema } from 'graphql-tools';
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
import { OptimalConditions } from '../entities/OptimalConditions';
import { Plant } from '../entities/Plant';
import { MyContext } from '../types';
import { destroyImages, uploadImages } from '../utils/cloudinary';
import { validateOptimalConditions } from '../utils/validators';
import { OptimalConditionsInput } from './types/OptimalConditionsInput';
import { OptimalConditionsResponse } from './types/OptimalConditionsResponse';
import { PlantFieldsInput } from './types/PlantFieldsInput';
import { PlantName } from './types/PlantName';
import { PlantResponse } from './types/PlantResponse';

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
    const plants = await Plant.find({ where: { isReported: false } });

    return plants;
  }

  @Query(() => Plant, { nullable: true })
  async plant(@Arg('id', () => Int) id: number): Promise<Plant | undefined> {
    const plant = await Plant.findOne(id);

    return plant;
  }

  @Query(() => [PlantName])
  async plantNames(): Promise<PlantName[]> {
    const plants = await Plant.find({
      select: ['id', 'primaryName', 'otherNames'],
    });

    const plantNames: PlantName[] = [];

    plants.forEach((plant) => {
      plantNames.push({ plantId: plant.id, name: plant.primaryName });
      plant.otherNames.forEach((otherName) => {
        plantNames.push({ plantId: plant.id, name: otherName });
      });
    });

    return plantNames;
  }

  @Mutation(() => PlantResponse)
  async editPlant(
    @Arg('id', () => Int) id: number,
    @Arg('editData') editData: PlantFieldsInput,
    @Arg('imagesToDelete', () => [String]) imagesToDelete: string[]
  ): Promise<PlantResponse> {
    const plantToEdit = await Plant.findOne(id);
    if (!plantToEdit) {
      return {
        errors: [{ field: 'id', message: 'Nie znaleziono takiej rośliny' }],
      };
    }

    const uploadResult = await uploadImages(editData.images);

    const newImages: string[] = [
      ...uploadResult.images,
      ...plantToEdit.images.filter((i) => !imagesToDelete.includes(i)),
    ];

    Object.assign(plantToEdit, editData);
    plantToEdit.images = newImages;
    plantToEdit.save();

    await destroyImages(imagesToDelete);

    return { plant: plantToEdit, errors: uploadResult.errors };
  }

  @Mutation(() => Boolean)
  async delete(@Arg('plantId', () => Int) plantId: number) {
    const result = await Plant.delete({ id: plantId });
    console.log(result);
    return true;
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

    const fieldErrors = validateOptimalConditions(data);
    if (fieldErrors) {
      return { errors: fieldErrors };
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

    return { optimalConditions };
  }

  @Mutation(() => PlantResponse)
  async addPlant(
    @Arg('data') data: PlantFieldsInput,
    @Ctx() { req }: MyContext
  ): Promise<PlantResponse> {
    const { description, primaryName, otherNames, images } = data;

    const plant = Plant.create({
      description,
      creatorId: req.session.userId,
      primaryName,
      otherNames,
      images: [],
    });

    // const promises: Promise<any>[] = [];

    const resultdd = await uploadImages(images);
    plant.images = resultdd.images;
    const errors = resultdd.errors;

    try {
      await plant.save();
    } catch (error) {
      if ((error.detail as string).includes('primaryName'))
        errors.push({
          field: 'primaryName',
          message: 'Roślina o tej nazwie już istnieje',
        });
      if ((error.detail as string).includes('otherNames'))
        errors.push({
          field: 'otherNames',
          message: 'Roślina o tej nazwie już istnieje',
        });
    }
    return { plant, errors: errors.length > 0 ? errors : undefined };
  }
}
