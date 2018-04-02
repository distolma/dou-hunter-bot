import { bot } from './bot';
import { onStart, onPing } from './controllers/app';

bot.onText(/\/start/, onStart);
bot.onText(/\/ping/, onPing);
bot.onText(/\/help/, onPing);
bot.onText(/\/pause/, onPing);
bot.onText(/\/stop/, onPing);
bot.onText(/\/info/, onPing);
