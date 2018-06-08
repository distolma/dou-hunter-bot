import mongoose from 'mongoose';

import { userSchema, IUserDocument, IUserModel } from './models/User';
import {
  vacancySchema,
  IVacancyDocument,
  IVacancyModel,
} from './models/Vacancy';

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  userSchema,
);

export const Vacancy = mongoose.model<IVacancyDocument, IVacancyModel>(
  'Vacancy',
  vacancySchema,
);
