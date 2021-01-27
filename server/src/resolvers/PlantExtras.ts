import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Intensity, Season } from '../entities/conditionsEnums';
import { OptimalConditions } from '../entities/OptimalConditions';
import { Plant } from '../entities/Plant';
import { FieldError } from '../shared/graphqlTypes';

@InputType()
export class PlantFieldsInput {
  @Field()
  primaryName: string;
  @Field(() => [String])
  otherNames: string[];
  @Field()
  description: string;
  @Field()
  imageUrl: string;
}

@InputType()
export class OptimalConditionsInput {
  @Field(() => Int)
  season: Season;
  @Field(() => Int)
  water: Intensity;
  @Field(() => Int)
  sun: Intensity;
  @Field()
  airHumidityLow: number;
  @Field()
  airHumidityHigh: number;
  @Field()
  temperatureLow: number;
  @Field()
  temperatureHigh: number;
}

@ObjectType()
export class PlantResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Plant, { nullable: true })
  plant?: Plant;
}

@ObjectType()
export class UploadImagesResponse {
  @Field()
  imageName: string;
  @Field()
  isSuccess: boolean;
}

@ObjectType()
export class OptimalConditionsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => OptimalConditions, { nullable: true })
  optimalConditions?: OptimalConditions;
}

@ObjectType()
export class PlantName {
  @Field(() => Int)
  plantId: number;
  @Field()
  name: string;
}
