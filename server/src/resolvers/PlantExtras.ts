import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Intensity, Season } from '../entities/conditionsEnums';
import { Plant } from '../entities/Plant';

@ObjectType()
export class PlantError {
  @Field()
  field: string;
  @Field()
  message: string;
}

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
  @Field(() => [OptimalConditionsInput])
  optimalConditions: OptimalConditionsInput[];
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
  @Field(() => [PlantError], { nullable: true })
  errors?: PlantError[];

  @Field(() => Plant, { nullable: true })
  plant?: Plant;
}
