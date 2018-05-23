import mongoose from 'mongoose';

import { userSchema, IUserDocument, IUserModel } from './models/User';
// import './models/Vacancy';
// import './models/City';

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

export const User = mongoose.model<IUserDocument, IUserModel>(
  'User',
  userSchema,
);
