import { Message } from 'node-telegram-bot-api'
import { model } from 'mongoose';

import { bot } from '../bot';
import categories from '../data/categories';
import { IUserModel, IUser } from '../db/models/User';

const User = model<IUserModel>('User');

export const onStart = async (message: Message) => {
  const chatId = message.chat.id;

  const user: any = await User.findOne({ tel_id: chatId }).exec();

  if (user) {

    bot.sendMessage(chatId, `<b>Hello, ${user.first_name} ${user.last_name}!</b>`, {
      parse_mode: 'HTML',
    });
  } else {
    const newUser = await new User({
      first_name: message.from.first_name,
      last_name: message.from.last_name,
      tel_id: message.from.id,
      username: message.from.username,
    } as IUser).save();

    bot.sendMessage(chatId, `Welcome new, ${newUser.first_name}`, {
      reply_markup: {
        keyboard: categories.map(({ title }) => [{ text: title }])
      },
    });
  }

  // const user = new User(aa);

  // user.save().then(console.log).catch(console.error);

};