import { Message } from 'node-telegram-bot-api';
import { emoji } from 'node-emoji';

import { bot } from '../bot';
import * as userControllers from './user';
import {
  welcomeMessage,
  welcomeMessageToNew,
  setConfigList,
} from '../templates';
import { cities, ICity } from '../data/cities';
import { categories, ICategory } from '../data/categories';

export const onStart = async (message: Message) => {
  const { id } = message.from;

  let user = await userControllers.getUser(message);
  if (!user) {
    user = await userControllers.createUser(message);
    bot.sendMessage(id, welcomeMessageToNew(user));
    return;
  }

  bot.sendMessage(id, welcomeMessage(user));
};

export const onPing = async (message: Message) => {
  bot.sendMessage(message.from.id, 'pong');
};

export const onPause = async (message: Message) => {
  await userControllers.pauseUser(message);
  bot.sendMessage(message.from.id, 'Paused!');
};

export const onResume = async (message: Message) => {
  await userControllers.activateUser(message);
  bot.sendMessage(message.from.id, 'Activated!');
};

export const onConfig = async (message: Message) => {
  const { id } = message.from;

  try {
    const city = await getConfig<ICity>(id, cities);
    await userControllers.setCity(id, city.value);

    const category = await getConfig<ICategory>(id, categories);
    await userControllers.setCategory(id, category.value);
  } catch (error) {
    bot.sendMessage(id, 'wrong' + emoji.smirk);
  }
};

const getConfig = <T extends ICity>(id: number, list: T[]) =>
  new Promise<T>((resolve, reject) => {
    bot.sendMessage(id, setConfigList(list));
    bot.on('message', function messageReceiver(msg: Message) {
      if (msg.from.id === id) {
        bot.removeListener('message', messageReceiver);
        if (msg.text && /\/\d+/.test(msg.text)) {
          const selectId = +msg.text.substr(1) - 1;
          resolve(list[selectId]);
        } else {
          reject();
        }
      }
    });
  });
