import { Message } from "node-telegram-bot-api";

import { bot } from '../bot';
import * as userControllers from './user';
import { welcomeMessage, welcomeMessageToNew } from '../messages';

export const onStart = async (message: Message) => {
  const chatId = message.chat.id;

  let user = await userControllers.getUser(message);
  if (!user) {
    user = await userControllers.createUser(message);
    bot.sendMessage(chatId, welcomeMessageToNew(user), {
      reply_markup: {
        remove_keyboard: true,
      }
    });
    return;
  }

  bot.sendMessage(chatId, welcomeMessage(user), {
    reply_markup: {
      remove_keyboard: true,
    }
  });
  return user;
}