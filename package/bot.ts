import TelegramBot from 'node-telegram-bot-api';

const { BOT_TOKEN, NODE_ENV } = process.env;
const url = process.env.APP_URL;
export let bot: TelegramBot;

if (NODE_ENV === 'development') {
  bot = new TelegramBot(BOT_TOKEN, { polling: true });
} else {
  bot = new TelegramBot(BOT_TOKEN);

  bot.setWebHook(`${url}/bot${BOT_TOKEN}`);
}