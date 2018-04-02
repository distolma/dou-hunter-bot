import { bot } from './bot';
import { onStart, onPing, onPause, onResume } from './controllers/app';

bot.onText(/\/start/, onStart);
bot.onText(/\/ping/, onPing);
bot.onText(/\/help/, onPing);
bot.onText(/\/pause/, onPause);
bot.onText(/\/resume/, onResume);
bot.onText(/\/stop/, onPing);
bot.onText(/\/info/, onPing);
