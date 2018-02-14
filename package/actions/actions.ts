import { Message } from 'node-telegram-bot-api'
import { model } from 'mongoose';

import { bot } from '../bot';
import categories from '../data/categories';

const User = model('User');

export const onStart = async (message: Message) => {
  const chatId = message.chat.id;

  const user: any = await User.findOne({ tel_id: chatId }).exec();

  if (!user) {
    bot.sendMessage(chatId, `Hello, ${user.first_name} ${user.last_name}!`);
  } else {
    bot.sendMessage(chatId, "Welcome", {
      "reply_markup": {
        "keyboard": categories.map(({ title }) => [{ text: title }])
      },
    });
  }

  // const user = new User(aa);

  // user.save().then(console.log).catch(console.error);

};