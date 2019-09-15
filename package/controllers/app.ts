import { RouterContext } from '@koa/router';
import { uniqWith, isEqual, flatten } from 'lodash';

import { bot } from '../bot';
import { Api } from '../utils/api';
import { notifyUsers } from '../utils/notify-users';
import { IUserDocument } from '../db/models/User';
import { Vacancy } from '../db';
import { IDOUResponse } from '../interfaces';

export async function hunt(ctx: RouterContext) {
  const api: Api = ctx.state.api;
  const activeUsers: IUserDocument[] = ctx.state.users;

  const mappedUsers = activeUsers.map(({ city, category }) => ({
    city,
    category,
  }));
  const requestsTemplate = uniqWith(mappedUsers, isEqual);

  const vacanciesArray = await Promise.all<IDOUResponse[]>(
    requestsTemplate.map(api.getVacancies.bind(api)),
  );
  const vacancies = flatten(vacanciesArray);

  const brandNewVacancies = await Vacancy.insertVacancies(vacancies);

  await notifyUsers(activeUsers, brandNewVacancies);

  ctx.body = brandNewVacancies;
  ctx.status = 200;
}

export async function botWebhook(ctx: RouterContext) {
  return bot.handleUpdate(ctx.request.body as any, ctx.response as any);
}
