import { Schema, model, Document } from 'mongoose';

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

export interface IUserModel extends IUser, Document {}

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

userSchema.pre('save', function(this: IUserModel) {
  this.update({}, { $set: { updatedAt: Date.now() } });
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
