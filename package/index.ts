import { bot } from './config-bot';

bot.onText(/\/start/, message => {
  const chatId = message.chat.id;

  bot.sendMessage(chatId, `Hello, ${message.from.first_name} ${message.from.last_name}!`);
});