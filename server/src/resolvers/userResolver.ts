import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
  Int,
} from 'type-graphql';
import { AccountType, User } from '../entities/User';
import argon2 from 'argon2';
import { COOKIE_NAME } from '../constants';
import { MyContext } from '../types';
import { RegisterCredentials } from '../inputTypes/registerCredentials';
import { validateRegister } from '../utils/validators';
import { FieldError } from '../shared/graphqlTypes';

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [Int])
  likedPlants(@Root() root: User) {
    const likedPlantsIds = root.likes?.map((l) => l.plantId);
    if (!likedPlantsIds) {
      return [];
    }
    return likedPlantsIds;
  }

  @FieldResolver(() => [Int!]!)
  upvotedReportsIds(@Root() root: User): number[] {
    const votedReportsIds = root.reportVotes
      .filter((r) => r.value === 1)
      .map((r) => r.reportId);
    return votedReportsIds;
  }

  @FieldResolver(() => [Int!]!)
  downvotedReportsIds(@Root() root: User): number[] {
    const votedReportsIds = root.reportVotes
      .filter((r) => r.value === -1)
      .map((r) => r.reportId);
    return votedReportsIds;
  }

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (user.id !== req.session.userId) {
      return '';
    }
    return user.email;
  }

  // @Mutation(() => UserResponse)
  // async changePassword(
  //   @Arg("newPassword") newPassword: string,
  //   @Arg("token") token: string,
  //   @Ctx()
  //   { redis, req }: MyContext
  // ): Promise<UserResponse> {
  //   if (newPassword.length <= 2) {
  //     return {
  //       errors: [
  //         {
  //           field: "newPassword",
  //           message: "length must be greater than 2",
  //         },
  //       ],
  //     };
  //   }
  //   const key = REDIS_PREFIX_FORGET_PASSWORD + token;
  //   const userIdString = await redis.get(REDIS_PREFIX_FORGET_PASSWORD + token);
  //   if (!userIdString) {
  //     return {
  //       errors: [
  //         {
  //           field: "token",
  //           message: "token expired",
  //         },
  //       ],
  //     };
  //   }
  //   const userId = parseInt(userIdString);

  //   const user = await User.findOne(userId);
  //   if (!user) {
  //     return {
  //       errors: [
  //         {
  //           field: "token",
  //           message: "user no longer exists",
  //         },
  //       ],
  //     };
  //   }

  //   const hashedPassword = await argon2.hash(newPassword);
  //   user.password = hashedPassword;

  //   await user.save();

  //   req.session.userId = user.id;

  //   await redis.del(key);

  //   return {
  //     user,
  //   };
  // }

  // @Mutation(() => Boolean)
  // async forgotPassword(
  //   @Arg("email") email: string,
  //   @Ctx()
  //   { redis }: MyContext
  // ) {
  //   const user = await User.findOne({ where: { email } });
  //   if (!user) {
  //     return true;
  //   }

  //   const token = v4();
  //   redis.set(
  //     REDIS_PREFIX_FORGET_PASSWORD + token,
  //     user.id,
  //     "ex",
  //     1000 * 3600 * 24
  //   ); // 1 day

  //   await sendEmail(
  //     user.email,
  //     `<a href="http://localhost:3000/change-password/${token}">change password</a>`
  //   );
  //   return true;
  // }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('credentials') credentials: RegisterCredentials,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(credentials);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(credentials.password);

    let user;
    try {
      user = await User.create({
        username: credentials.username,
        password: hashedPassword,
        email: credentials.email,
        accountType: AccountType.user,
      }).save();
    } catch (err) {
      console.log(err);
      if (err.code === '23505') {
        if (err.detail.includes('email')) {
          return {
            errors: [
              {
                field: 'email',
                message: 'Ten adres email jest już zajęty',
              },
            ],
          };
        } else {
          return {
            errors: [
              {
                field: 'username',
                message: 'Ta nazwa użytkownika jest już zajęta',
              },
            ],
          };
        }
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    if (!user) {
      return { errors: [{ field: 'user', message: 'user was undefined' }] };
    }
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,

    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: usernameOrEmail.includes('@')
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });

    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'username or email incorrect',
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: { req: any; res: any }) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        res.clearCookie(COOKIE_NAME);
        resolve(true);
      })
    );
  }
}
