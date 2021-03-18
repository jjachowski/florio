import { Request, Response } from 'express';
import { Redis } from 'ioredis';
// import { S3 } from 'aws-sdk';
export type MyContext = {
  req: Request & { session: any & { userId: number } };
  redis: Redis;
  res: Response;
  // s3: S3;
};
