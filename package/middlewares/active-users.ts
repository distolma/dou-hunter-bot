import { User } from '../db';

export async function activeUsers(ctx, next) {
  ctx.state.users = await User.find({ status: 'active' }).exec();

  await next();
}
