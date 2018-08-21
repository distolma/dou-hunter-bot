import { User } from '../db';
import { IBotContext } from '../interfaces';

export async function getUser(ctx: IBotContext, next) {
  ctx.state.user = await User.findOne({ tel_id: ctx.from.id });

  await next();
}
