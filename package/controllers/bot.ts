import { emoji } from 'node-emoji';

import { bot } from '../bot';
import { IBotContext } from '../interfaces'
import {
  welcomeMessage,
  welcomeMessageToNew,
  setConfigList,
} from '../templates';
import { Cities } from '../dictionaries/cities';
import { Categories } from '../dictionaries/categories';
import { User } from '../db';

export const onStart = async (ctx: IBotContext) => {
  const { id } = ctx.from;
  let { user } = ctx.state;

  if (!user) {
    user = await User.create({ tel_id: id, ...ctx.from });
    await ctx.reply(welcomeMessageToNew(user));

    configureUser(ctx);

    return;
  }

  if (user.status === 'pending') {
    configureUser(ctx);
  }

  return ctx.reply(welcomeMessage(user));
};

export const onPing = (ctx: IBotContext) => {
  return ctx.reply('pong');
};

export const onPause = async (ctx: IBotContext) => {
  await User.findOneAndUpdate(
    { tel_id: ctx.from.id },
    { status: 'pause' },
  ).exec();
  ctx.reply('Paused!');
};

export const onResume = async (ctx: IBotContext) => {
  await User.findOneAndUpdate(
    { tel_id: ctx.from.id },
    { status: 'active' },
  ).exec();
  ctx.reply('Activated!');
};

export const onConfig = async (ctx: IBotContext) => {
  configureUser(ctx);
};

const getConfig = <T>(ctx: IBotContext, list: T) =>
  new Promise<string>((resolve, reject) => {
    ctx.reply(setConfigList(list));
    bot.on('message', function messageReceiver(msg: IBotContext) {
      if (msg.from.id === ctx.from.id) {
        // bot.removeListener('message', messageReceiver);
        // if (msg.text && /\/\d+/.test(msg.message.text)) {
        //   const index = +msg.message.text.substr(1) - 1;
        //   const selectId = Object.keys(list)[index];

        //   list[selectId] ? resolve(list[selectId]) : reject();
        // } else {
        //   reject();
        // }
        reject();
      }
    });
  });

const configureUser = async (ctx: IBotContext) => {
  const { id } = ctx.from;
  await User.updateUser(id, { status: 'pending' });

  try {
    const city = await getConfig<typeof Cities>(ctx, Cities);
    await User.findOneAndUpdate({ tel_id: id }, { city }).exec();

    const category = await getConfig<typeof Categories>(ctx, Categories);
    await User.findOneAndUpdate({ tel_id: id }, { category }).exec();

    User.updateUser(id, { status: 'active' });
    return ctx.reply('we are ready! ' + emoji.v);
  } catch (error) {
    return ctx.reply('wrong' + emoji.smirk);
  }
};
