import { Message } from 'node-telegram-bot-api';

import { bot } from '../bot';
import * as userControllers from './user';
import { welcomeMessage, welcomeMessageToNew } from '../templates';

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
