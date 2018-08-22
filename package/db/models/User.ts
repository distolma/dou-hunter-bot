import { Schema, Document, Model } from 'mongoose';
import sanitizerPlugin from 'mongoose-sanitizer';

import { IUser } from '../../interfaces';

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  getActives(): Promise<Array<IUserDocument>>;
  getById(id: number): Promise<IUserDocument>;
  pause(id: number): Promise<IUserDocument>;
  active(id: number): Promise<IUserDocument>;
  updateUser(id: number, user: Partial<IUser>): Promise<IUserDocument>;
}

export const UserSchema = new Schema(
  {
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
  },
  { timestamps: true },
);

UserSchema.plugin(sanitizerPlugin);

// // Hooks
// UserSchema.pre('save', function(this: IUserDocument) {
//   this.update({}, { $set: { updatedAt: Date.now() } });
// });

UserSchema.static('getActives', function(this: IUserModel) {
  return this.find({ status: 'active' }).exec();
});

UserSchema.static('getById', function(this: IUserModel, id: number) {
  return this.findOne({ tel_id: id }).exec();
});

UserSchema.static('pause', function(this: IUserModel, id: number) {
  return this.findOneAndUpdate({ tel_id: id }, { status: 'pause' }).exec();
});

UserSchema.static('active', function(this: IUserModel, id: number) {
  return this.findOneAndUpdate({ tel_id: id }, { status: 'active' }).exec();
});

UserSchema.static('updateUser', function(
  this: IUserModel,
  id: number,
  user: Partial<IUser>,
) {
  return this.findOneAndUpdate({ tel_id: id }, user).exec();
});
