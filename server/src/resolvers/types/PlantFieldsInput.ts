import { InputType, Field } from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class PlantFieldsInput {
  @Field()
  primaryName: string;
  @Field(() => [String])
  otherNames: string[];
  @Field()
  description: string;
  @Field()
  isCatFriendly: boolean;
  @Field({ nullable: true })
  isCatFriendlySource?: string;
  @Field()
  isDogFriendly: boolean;
  @Field({ nullable: true })
  isDogFriendlySource?: string;
  @Field(() => [GraphQLUpload]!)
  images: FileUpload[];
}
