// import { Message } from 'node-telegram-bot-api';
// import { emoji } from 'node-emoji';

// import { bot } from '../bot';
// import * as userControllers from './user';
// import {
//   welcomeMessage,
//   welcomeMessageToNew,
//   setConfigList,
// } from '../templates';
// import { cities, ICity } from '../data/cities';
// import { categories, ICategory } from '../data/categories';
// import { User } from '../db';

// export const onStart = async (message: Message) => {
//   const { id } = message.chat;

//   let user = await userControllers.getUser(id);
//   if (!user) {
//     user = await userControllers.createUser(message);
//     bot.sendMessage(id, welcomeMessageToNew(user));

//     configureUser(id);

//     return;
//   }

//   if (user.status === 'pending') {
//     configureUser(id);
//   }

//   bot.sendMessage(id, welcomeMessage(user));
// };

// export const onPing = async (message: Message) => {
//   bot.sendMessage(message.from.id, 'pong');
// };

// export const onPause = async (message: Message) => {
//   await userControllers.pauseUser(message.from.id);
//   bot.sendMessage(message.from.id, 'Paused!');
// };

// export const onResume = async (message: Message) => {
//   await userControllers.activateUser(message.from.id);
//   bot.sendMessage(message.from.id, 'Activated!');
// };

// export const onConfig = async (message: Message) => {
//   const { id } = message.from;

//   configureUser(id);
// };

// const getConfig = <T extends ICity>(id: number, list: T[]) =>
//   new Promise<T>((resolve, reject) => {
//     bot.sendMessage(id, setConfigList(list));
//     bot.on('message', function messageReceiver(msg: Message) {
//       if (msg.from.id === id) {
//         bot.removeListener('message', messageReceiver);
//         if (msg.text && /\/\d+/.test(msg.text)) {
//           const selectId = +msg.text.substr(1) - 1;
//           resolve(list[selectId]);
//         } else {
//           reject();
//         }
//       }
//     });
//   });

// const configureUser = async (id: number) => {
//   await User.updateUser(id, { status: 'pending' });

//   try {
//     const city = await getConfig<ICity>(id, cities);
//     await userControllers.setCity(id, city.value);

//     const category = await getConfig<ICategory>(id, categories);
//     await userControllers.setCategory(id, category.value);

//     User.updateUser(id, { status: 'active' });
//     bot.sendMessage(id, 'we are ready! ' + emoji.v);
//   } catch (error) {
//     bot.sendMessage(id, 'wrong' + emoji.smirk);
//   }
// };
