import TelegramBot from 'node-telegram-bot-api';

const { BOT_TOKEN, NODE_ENV } = process.env;

export let bot: TelegramBot;

// if(NODE_ENV === 'production') {
//   bot = new TelegramBot(BOT_TOKEN);
//   bot.setWebHook(HEROKU_URL + BOT_TOKEN);
// }
// else {
// }
bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('Bot server started in the ' + NODE_ENV + ' mode');
