import TelegramBot from 'telegraf';

import { IBotContext } from './interfaces';

const { BOT_TOKEN, NODE_ENV, HEROKU_URL } = process.env;

export let bot = new TelegramBot<IBotContext>(BOT_TOKEN);

if (NODE_ENV === 'production') {
  bot.telegram.setWebhook(`${HEROKU_URL}/bot${BOT_TOKEN}`);
} else {
  bot.startPolling();
}

console.log('Bot server started in the ' + NODE_ENV + ' mode');
