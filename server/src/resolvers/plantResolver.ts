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
import { MyContext } from '../types';
import { validateOptimalConditions } from '../utils/validators';
import {
  OptimalConditionsInput,
  OptimalConditionsResponse,
  PlantFieldsInput,
  PlantName,
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
    @Ctx() { req }: MyContext
  ): Promise<PlantResponse> {
    const { description, imageUrl, primaryName, otherNames } = data;

    const plant = Plant.create({
      description,
      imageUrl,
      creatorId: req.session.userId,
      primaryName,
      otherNames,
    });

    await plant.save();
    return { plant };
  }

  @Mutation(() => Boolean)
  async upload(
    @Arg('image', () => GraphQLUpload!)
    file: FileUpload
  ) {
    // console.log('upload file: ', file.createReadStream);
    // return true;

    const { createReadStream, filename } = await file;
    // const writableStream = createWriteStream(
    //   `${__dirname}/files/images/${filename}`,
    //   { autoClose: true }
    // );
    // return new Promise((res, rej) => {
    //   createReadStream()
    //     .pipe(writableStream)
    //     .on('finish', () => res(true))
    //     .on('error', () => rej(false));
    // });

    const uploadCloudinary = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'test',
      },
      (error, result) => console.log(error, result)
    );
    console.log(file);
    return new Promise((resolve, reject) =>
      file
        .createReadStream()
        .pipe(uploadCloudinary)
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
    // console.log('await: ', await file);
    // return true;
  }
}
