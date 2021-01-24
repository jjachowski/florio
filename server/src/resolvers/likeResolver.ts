import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Like } from '../entities/Like';
import { Plant } from '../entities/Plant';
import { MyContext } from '../types';
import cloudinary from 'cloudinary';

@Resolver(Like)
export class LikeResolver {
  @Mutation(() => Boolean)
  async addLike(
    @Arg('plantId', () => Int) plantId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const plantToLike = await Plant.findOne(plantId);

    if (!plantToLike) {
      return false;
    }

    const existingLike = await Like.findOne({
      where: {
        creatorId: req.session.userId,
        plantId,
      },
    });

    if (existingLike) {
      return true;
    }

    const like = Like.create({
      creatorId: req.session.userId,
      plantId: plantToLike.id,
    });
    await like.save();
    plantToLike.score++;
    plantToLike.save();
    return true;
  }

  @Mutation(() => Boolean)
  async removeLike(
    @Arg('plantId', () => Int) plantId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const plantToLike = await Plant.findOne(plantId);

    if (!plantToLike) {
      return false;
    }

    const existingLike = await Like.findOne({
      where: {
        creatorId: req.session.userId,
        plantId,
      },
    });

    if (!existingLike) {
      return true;
    }

    await Like.delete({
      creatorId: req.session.userId,
      plantId: plantToLike.id,
    });
    plantToLike.score--;
    plantToLike.save();
    return true;
  }

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
