import { MyContext } from 'src/types';
import { MiddlewareFn } from 'type-graphql';
import { AccountType, User } from '../entities/User';

export const isAuth: MiddlewareFn<MyContext> = ({ context: { req } }, next) => {
  if (!req.session.userId) {
    throw new Error('unauthorized');
  }
  return next();
};

export const isAdmin: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next
) => {
  const userId = req.session.userId;
  if (!userId) {
    throw new Error('unauthorized');
  }
  const user = await User.findOne({
    where: { id: userId, accountType: AccountType.admin },
  });
  if (!user) {
    throw new Error(
      'you dont have sufficient privilges to execute this action'
    );
  }
  return next();
};
