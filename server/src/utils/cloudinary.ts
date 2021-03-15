import { FileUpload, GraphQLUpload } from 'graphql-upload';
import cloudinary from 'cloudinary';
import { FieldError } from 'src/shared/graphqlTypes';

export const destroyImages = async (imagesIds: string[]): Promise<void> => {
  imagesIds.forEach(async (image) => {
    console.log('deleting image: ', image);
    await cloudinary.v2.uploader.destroy(image);
  });
};

export const uploadImages = async (
  images: PromiseSettledResult<FileUpload>[]
): Promise<{ images: string[]; errors: FieldError[] }> => {
  const promises: Promise<any>[] = [];

  images.forEach((image) => {
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
                console.log('success?');

                resolve(result.public_id);
              }
              if (error) {
                console.log('error');

                reject(error.message);
              }
            }
          )
        );
      })
    );
  });
  const settledPromises = await Promise.allSettled(promises);
  console.log('settled promises: ', settledPromises);

  const result: string[] = [];
  const errors: FieldError[] = [];
  settledPromises.forEach((r) => {
    if (r.status === 'fulfilled') {
      result.push((r as PromiseFulfilledResult<any>).value);
    } else {
      errors.push({ field: 'images', message: r.reason });
    }
  });
  console.log('returns: ', { images: result, errors });

  return { images: result, errors };
};
