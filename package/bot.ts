import TelegramBot from 'node-telegram-bot-api';

const { BOT_TOKEN } = process.env;
// const url = process.env.APP_URL;
export let bot = new TelegramBot(BOT_TOKEN, { polling: true });

// if (NODE_ENV === 'development') {
// } else {
//   bot = new TelegramBot(BOT_TOKEN);

//   bot.setWebHook(`${url}/bot${BOT_TOKEN}`);
// }
