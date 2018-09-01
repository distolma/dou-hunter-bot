import { User } from '../db';
import { IBotContext } from '../interfaces';

export async function getUser(ctx: IBotContext, next) {
  ctx.state.user = await User.getById(ctx.from.id);

  await next();
}
