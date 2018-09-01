import { bot } from '../bot';
import { getUser } from '../middlewares/get-user';
import {
  onStart,
  onPing,
  onPause,
  onResume,
  onConfig,
  onNumberCommand,
} from '../controllers/bot';

bot.start(getUser, onStart);
bot.command('ping', onPing);
bot.command('pause', onPause);
bot.command('resume', onResume);
bot.command('config', onConfig);
bot.hears(/\/\d+/, onNumberCommand);
// bot.onText(/\/stop/, onPing);
// bot.onText(/\/info/, onPing);
// bot.onText(/\/help/, onPing);
