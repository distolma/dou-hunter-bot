import { User } from '../db';

export async function activeUsers(ctx, next) {
  ctx.state.users = await User.getActives();

  await next();
}
