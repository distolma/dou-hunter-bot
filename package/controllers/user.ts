// import { Message } from 'node-telegram-bot-api';

// import { User } from '../db';
// import { IVacanciesInquiries } from '../interfaces';

// export const createUser = ({
//   from: { id, first_name, last_name, username },
// }: Message) => User.create({ tel_id: id, first_name, last_name, username });

// export const updateUser = ({
//   from: { id, first_name, last_name, username },
// }: Message) =>
//   User.findOneAndUpdate(
//     { tel_id: id },
//     { first_name, last_name, username },
//   ).exec();

// export const removeUser = (id: number) =>
//   User.findOneAndRemove({ tel_id: id }).exec();

// export const getUser = (id: number) => User.findOne({ tel_id: id }).exec();

// export const getAllUsers = () => User.find();

// export const getActiveUsers = () => User.find({ status: 'active' });

// export const getPausedUsers = () => User.find({ status: 'pause' });

// export const pauseUser = (id: number) =>
//   User.findOneAndUpdate({ tel_id: id }, { status: 'pause' }).exec();

// export const activateUser = (id: number) =>
//   User.findOneAndUpdate({ tel_id: id }, { status: 'active' }).exec();

// export const setCity = (id: number, city: string) =>
//   User.findOneAndUpdate({ tel_id: id }, { city }).exec();

// export const setCategory = (id: number, category: string) =>
//   User.findOneAndUpdate({ tel_id: id }, { category }).exec();

// export const findActiveUsers = (params: any) =>
//   User.find({ ...params, status: 'active' }).exec();

// export const getVacanciesInquiry = async () => {
//   const map: IVacanciesInquiries = {};
//   const users = await getActiveUsers();

//   users.forEach(user => {
//     const { category, city } = user;

//     if (category && city) {
//       if (!map[category]) map[category] = new Set();
//       map[category].add(city);
//     }
//   });

//   return map;
// };
