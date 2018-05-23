import { Schema, Document, Model } from 'mongoose';

import { IVacanciesInquiries } from '../../interfaces';

export interface IUser {
  tel_id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  city?: string;
  category?: string;
  status: 'active' | 'pause';
  created: number;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  getVacanciesInquiry(): Promise<IVacanciesInquiries>;
  getActive(): Promise<Array<IUserDocument>>;
}

export const userSchema = new Schema({
  tel_id: {
    type: Number,
    unique: true,
  },
  first_name: String,
  last_name: String,
  username: String,
  city: String,
  category: String,
  status: {
    type: String,
    enum: ['active', 'pause'],
    default: 'active',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.static('getVacanciesInquiry', async function(this: IUserModel) {
  const map = {};
  for (const user of await this.getActive()) {
    const { category, city } = user;
    if (category && city) {
      if (!map[category]) map[category] = new Set();
      map[category].add(city);
    }
  }
  return map;
});

userSchema.static('getActive', async function(this: IUserModel) {
  return this.find({ status: 'active' }).exec();
});
