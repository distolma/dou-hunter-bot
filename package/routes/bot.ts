import { bot } from '../bot';
import { getUser } from '../middlewares/get-user';
import {
  onStart,
  onPing,
  onPause,
  onResume,
  onConfig,
} from '../controllers/bot';

bot.start(getUser, onStart);
bot.hears(/\/ping/, onPing);
bot.hears(/\/pause/, onPause);
bot.hears(/\/resume/, onResume);
bot.hears(/\/config/, onConfig);
// bot.onText(/\/stop/, onPing);
// bot.onText(/\/info/, onPing);
// bot.onText(/\/help/, onPing);
