import { emoji } from 'node-emoji';

import { IBotContext } from '../interfaces';
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
  await User.pause(ctx.from.id);
  ctx.reply('Paused!');
};

export const onResume = async (ctx: IBotContext) => {
  await User.active(ctx.from.id);
  ctx.reply('Activated!');
};

export const onConfig = async (ctx: IBotContext) => {
  configureUser(ctx);
};

function updateUserPref(ctx: IBotContext, pref: any, key: string) {
  const index = +ctx.message.text.substr(1) - 1;
  const selectId = Object.keys(pref)[index];
  const result = { [key]: pref[selectId] };

  if (!result[key]) throw Error('Not Found');

  return User.findOneAndUpdate({ tel_id: ctx.from.id }, result).exec();
}

export const onNumberCommand = async (ctx: IBotContext) => {
  try {
    switch (ctx.session.config_step) {
      case 0: {
        ctx.session.config_step++;

        return ctx.reply(setConfigList(Cities));
      }
      case 1: {
        ctx.session.config_step++;

        await updateUserPref(ctx, Cities, 'city');
        return ctx.reply(setConfigList(Categories));
      }
      case 2: {
        delete ctx.session.config_step;

        await updateUserPref(ctx, Categories, 'category');
        await User.updateUser(ctx.from.id, { status: 'active' });
        return ctx.reply('we are ready! ' + emoji.v);
      }
    }
  } catch {
    delete ctx.session.config_step;
    return ctx.reply('wrong' + emoji.smirk);
  }
};

const configureUser = async (ctx: IBotContext) => {
  ctx.session.config_step = 0;
  await User.updateUser(ctx.from.id, { status: 'pending' });

  return onNumberCommand(ctx);
};
