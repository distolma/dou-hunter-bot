import { Schema, Document, Model } from 'mongoose';
import sanitizerPlugin from 'mongoose-sanitizer';

// import { IVacanciesInquiries } from '../../interfaces';

export interface IUser {
  tel_id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  city?: string;
  category?: string;
  status: 'active' | 'pause' | 'pending';
  createdAt: number;
  updatedAt: number;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  // getVacanciesInquiry(): Promise<IVacanciesInquiries>;
  getActives(): Promise<Array<IUserDocument>>;
  getById(id: number): Promise<IUserDocument>;
  updateUser(id: number, user: Partial<IUser>): Promise<IUserDocument>;
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
    enum: ['active', 'pause', 'pending'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(sanitizerPlugin);

// Hooks
userSchema.pre('save', function(this: IUserDocument) {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

// userSchema.static('getVacanciesInquiry', async function(this: IUserModel) {
//   const map = {};
//   for (const user of await this.getActives()) {
//     const { category, city } = user;
//     if (category && city) {
//       if (!map[category]) map[category] = new Set();
//       map[category].add(city);
//     }
//   }
//   return map;
// });

userSchema.static('getActives', function(this: IUserModel) {
  return this.find({ status: 'active' }).exec();
});

userSchema.static('getById', function(this: IUserModel, id: number) {
  return this.findOne({ tel_id: id }).exec();
});

userSchema.static('updateUser', function(
  this: IUserModel,
  id: number,
  user: Partial<IUser>,
) {
  return this.findOneAndUpdate({ tel_id: id }, user).exec();
});

// userSchema.static('updateUser', function(
//   this: IUserModel,

// ) {
//   export const createUser = ({
//     from: { id, first_name, last_name, username },
//   }: Message) =>
//     new User({ tel_id: id, first_name, last_name, username }).save();
// });
