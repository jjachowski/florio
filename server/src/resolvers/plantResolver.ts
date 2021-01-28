import cloudinary from 'cloudinary';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
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
import { FieldError } from '../shared/graphqlTypes';
import { MyContext } from '../types';
import { validateOptimalConditions } from '../utils/validators';
import {
  OptimalConditionsInput,
  OptimalConditionsResponse,
  PlantFieldsInput,
  PlantName,
  PlantResponse,
  UploadImagesResponse,
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
    @Arg('editData') editData: PlantFieldsInput
  ): Promise<PlantResponse> {
    const plantToEdit = await Plant.findOne(id);
    if (!plantToEdit) {
      return {
        errors: [{ field: 'id', message: 'Nie znaleziono takiej rośliny' }],
      };
    }
    Object.assign(plantToEdit, editData);

    await plantToEdit.save();

    return { plant: plantToEdit };
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
    // @Arg('images', () => [GraphQLUpload]!)
    // images: FileUpload[],
    @Ctx() { req }: MyContext
  ): Promise<PlantResponse> {
    const { description, primaryName, otherNames, images } = data;
    const errors: FieldError[] = [];

    const plant = Plant.create({
      description,
      creatorId: req.session.userId,
      primaryName,
      otherNames,
      images: [],
    });

    const promises: Promise<any>[] = [];

    const settledImages = await Promise.allSettled(images);
    settledImages.forEach((image) => {
      const {
        createReadStream,
      } = (image as PromiseFulfilledResult<FileUpload>).value;
      promises.push(
        new Promise((resolve, reject) => {
          createReadStream().pipe(
            cloudinary.v2.uploader.upload_stream(
              {
                folder: 'plantImages',
                use_filename: true,
              },
              (error, result) => {
                if (result?.secure_url) {
                  // console.log('cloudinary result: ', result);

                  // plant.images.push(result.secure_url);
                  resolve(result.public_id);
                }
                if (error) {
                  reject(error.message);
                }
              }
            )
          );
        })
      );
    });
    const result = await Promise.allSettled(promises);
    result.forEach((r) => {
      if (r.status === 'fulfilled') {
        plant.images.push((r as PromiseFulfilledResult<any>).value);
      } else {
        errors.push({ field: 'images', message: r.reason });
      }
    });
    console.log('settled promises: ', result);

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

  @Mutation(() => Boolean)
  async upload(
    @Arg('images', () => [GraphQLUpload]!)
    images: FileUpload[]
  ) {
    const settledImages = await Promise.allSettled(images);
    settledImages.forEach(async (image) => {
      const {
        filename,
        createReadStream,
      } = (image as PromiseFulfilledResult<FileUpload>).value;
      createReadStream().pipe(
        cloudinary.v2.uploader.upload_stream(
          {
            folder: 'test',
            use_filename: true,
          },
          (error, result) => console.log('uploadCloudinary: ', error, result)
        )
      );
    });
    return true;
  }
}
