import { Api } from '../utils/api';

export async function tokens(ctx, next) {
  ctx.state.api = new Api();
  await ctx.state.api.getTokens();

  await next();
}