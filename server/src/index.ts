import { ApolloServer } from 'apollo-server-express';
import cloudinary from 'cloudinary';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { graphqlUploadExpress } from 'graphql-upload';
import Redis from 'ioredis';
import path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { Like } from './entities/Like';
import { OptimalConditions } from './entities/OptimalConditions';
import { Plant } from './entities/Plant';
import { PlantReport } from './entities/PlantReport';
import { ReportVote } from './entities/ReportVote';
import { TemporaryPlant } from './entities/TemporaryPlant';
import { User } from './entities/User';
import { LikeResolver } from './resolvers/likeResolver';
import { PlantResolver } from './resolvers/plantResolver';
import { ReportResolver } from './resolvers/reportResolver';
import { TemporaryPlantResolver } from './resolvers/temporaryPlantResolver';
import { UserResolver } from './resolvers/userResolver';

const main = async () => {
  require('dotenv').config();

  await createConnection({
    type: 'postgres',
    database: 'florio',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [
      User,
      Plant,
      OptimalConditions,
      Like,
      PlantReport,
      ReportVote,
      TemporaryPlant,
    ],
  });

  const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } = process.env;

  cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  const app = express();

  app.use(graphqlUploadExpress({ maxFiles: 3, maxFileSize: 1000000000 }));

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
      secret: 'some secret',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        PlantResolver,
        TemporaryPlantResolver,
        LikeResolver,
        ReportResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    uploads: false,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('florio server started on localhost:4000');
  });
};

main().catch((err) => {
  console.error(err);
});
