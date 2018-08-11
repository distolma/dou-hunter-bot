import { IRouterContext } from 'koa-router';
import { uniqWith, isEqual, flatten } from 'lodash';

import { bot } from '../bot';
import { Api } from '../utils/api';
import { concatenate } from '../utils/concatenate';
import { IUserDocument } from '../db/models/User';
import { Vacancy } from '../db';
import { IDOUResponse } from '../interfaces';

export async function hunt(this:any, ctx: IRouterContext) {
  const api: Api = ctx.state.api;
  const activeUsers: IUserDocument[] = ctx.state.users;

  const mappedUsers = activeUsers.map(({ city, category }) => ({ city, category }));
  const requestsTemplate = uniqWith(mappedUsers, isEqual);

  const vacanciesArray = await Promise.all<IDOUResponse[]>(requestsTemplate.map(api.getVacancies.bind(api)));
  const vacancies = flatten(vacanciesArray);

  const brandNewVacancies = await Vacancy.insertVacancies(vacancies);

  const usersWithMessages = concatenate(activeUsers, brandNewVacancies);

  ctx.body = usersWithMessages;
  ctx.status = 200;
};

export async function botWebhook(ctx: IRouterContext) {
  bot.processUpdate(ctx.body);
  ctx.status = 200;
}
