import { InputType, Field, Int } from 'type-graphql';
import { Season, Intensity } from '../../entities/conditionsEnums';

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
