import { Message } from 'node-telegram-bot-api';
import { emoji } from 'node-emoji';

import { bot } from '../bot';
import {
  welcomeMessage,
  welcomeMessageToNew,
  setConfigList,
} from '../templates';
import { Cities } from '../dictionaries/cities';
import { Categories } from '../dictionaries/categories';
import { User } from '../db';

export const onStart = async (message: Message) => {
  const { id } = message.chat;

  let user = await User.findOne({ tel_id: id }).exec();
  if (!user) {
    user = await User.create({ tel_id: id, ...message.from });
    bot.sendMessage(id, welcomeMessageToNew(user));

    configureUser(id);

    return;
  }

  if (user.status === 'pending') {
    configureUser(id);
  }

  bot.sendMessage(id, welcomeMessage(user));
};

export const onPing = async (message: Message) => {
  bot.sendMessage(message.from.id, 'pong');
};

export const onPause = async (message: Message) => {
  await User.findOneAndUpdate(
    { tel_id: message.from.id },
    { status: 'pause' },
  ).exec();
  bot.sendMessage(message.from.id, 'Paused!');
};

export const onResume = async (message: Message) => {
  await User.findOneAndUpdate(
    { tel_id: message.from.id },
    { status: 'active' },
  ).exec();
  bot.sendMessage(message.from.id, 'Activated!');
};

export const onConfig = async (message: Message) => {
  const { id } = message.from;

  configureUser(id);
};

const getConfig = <T>(id: number, list: T) =>
  new Promise<string>((resolve, reject) => {
    bot.sendMessage(id, setConfigList(list));
    bot.on('message', function messageReceiver(msg: Message) {
      if (msg.from.id === id) {
        bot.removeListener('message', messageReceiver);
        if (msg.text && /\/\d+/.test(msg.text)) {
          const index = +msg.text.substr(1) - 1;
          const selectId = Object.keys(list)[index]

          list[selectId] ? resolve(list[selectId]) : reject();
        } else {
          reject();
        }
      }
    });
  });

const configureUser = async (id: number) => {
  await User.updateUser(id, { status: 'pending' });

  try {
    const city = await getConfig<typeof Cities>(id, Cities);
    await User.findOneAndUpdate({ tel_id: id }, { city }).exec();

    const category = await getConfig<typeof Categories>(id, Categories);
    await User.findOneAndUpdate({ tel_id: id }, { category }).exec();

    User.updateUser(id, { status: 'active' });
    bot.sendMessage(id, 'we are ready! ' + emoji.v);
  } catch (error) {
    bot.sendMessage(id, 'wrong' + emoji.smirk);
  }
};
