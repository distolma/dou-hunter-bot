import { bot } from '../bot';
import {
  onStart,
  onPing,
  onPause,
  onResume,
  onConfig,
} from '../controllers/bot';

bot.hears(/\/start/, onStart);
bot.hears(/\/ping/, onPing);
bot.hears(/\/pause/, onPause);
bot.hears(/\/resume/, onResume);
bot.hears(/\/config/, onConfig);
// bot.onText(/\/stop/, onPing);
// bot.onText(/\/info/, onPing);
// bot.onText(/\/help/, onPing);
