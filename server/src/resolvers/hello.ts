import { Resolver, Query } from 'type-graphql';
import cloudinary from 'cloudinary';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    cloudinary.v2.uploader.upload(
      'https://zielony-parapet.pl/2539-large_default/senecio-rowleyanus-starzec-zwisajacy.jpg',
      { public_id: 'roślinka' },
      function (error, result) {
        console.log('error: ', error);
        console.log('result: ', result);
      }
    );
    return 'bye';
  }
}
