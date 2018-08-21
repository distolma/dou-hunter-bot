import mongoose from 'mongoose';
import MongoSession from 'telegraf-session-mongo';

import { UserSchema, IUserDocument, IUserModel } from './models/User';
import {
  VacancySchema,
  IVacancyDocument,
  IVacancyModel,
} from './models/Vacancy';
import { bot } from '../bot';

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true },
);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  UserSchema,
);

export const Vacancy = mongoose.model<IVacancyDocument, IVacancyModel>(
  'Vacancy',
  VacancySchema,
);

export const a = new MongoSession(mongoose.connection);
a.setup().then(() => bot.use(a.middleware));