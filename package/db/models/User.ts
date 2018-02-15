import { Schema, model, Document } from 'mongoose';

export interface IUser {
  tel_id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  vacancies?: [[string, string]];
}

export interface IUserModel extends IUser, Document { }

export const userSchema = new Schema({
  tel_id: {
    type: Number,
    unique: true,
  },
  first_name: String,
  last_name: String,
  username: String,
  vacancies: [[String, String]],
});

// userSchema.pre('save', function (next) {
//   if (!this.isModified('first_name') || !this.isModified('last_name')) {
//     next(); // skip
//     return; // stop
//   }
//   this.full_name = `${this.first_name} ${this.last_name}`;
//   next();
// });

export default model<IUserModel>('User', userSchema);