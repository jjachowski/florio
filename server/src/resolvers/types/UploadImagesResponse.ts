import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class UploadImagesResponse {
  @Field()
  imageName: string;
  @Field()
  isSuccess: boolean;
}
