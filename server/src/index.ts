import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { Plant } from './entities/Plant';
import { PlantName } from './entities/PlantName';
import { User } from './entities/User';
import { PlantResolver } from './resolvers/plantResolver';
import { UserResolver } from './resolvers/userResolver';

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'florio',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Plant, PlantName],
  });

  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: 'asdfadsfsdfgsdfbsdfb1325',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PlantResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      //   userLoader: createUserLoader(),
      //   updootLoader: createUpdootLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('florio server started on localhost:4000');
  });
};

main().catch((err) => {
  console.error(err);
});
