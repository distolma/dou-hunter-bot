import { Message } from 'node-telegram-bot-api';
import { model } from 'mongoose';

import { IUserModel, IUser } from '../db/models/User';

const User = model<IUserModel>('User');

export const createUser = ({
  from: { id, first_name, last_name, username },
}: Message) =>
  new User({ tel_id: id, first_name, last_name, username } as IUser).save();

export const updateUser = ({
  from: { id, first_name, last_name, username },
}: Message) =>
  User.findOneAndUpdate(
    { tel_id: id },
    { first_name, last_name, username },
  ).exec();

export const removeUser = ({ from: { id } }: Message) =>
  User.findOneAndRemove({ tel_id: id }).exec();

export const getUser = ({ from: { id } }: Message) =>
  User.findOne({ tel_id: id } as IUser).exec();

export const getAllUsers = () => User.find();

export const pauseUser = ({ from: { id } }: Message) =>
  User.findOneAndUpdate({ tel_id: id }, { status: 'pause' }).exec();

export const activateUser = ({ from: { id } }: Message) =>
  User.findOneAndUpdate({ tel_id: id }, { status: 'active' }).exec();
