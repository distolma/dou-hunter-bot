import { bot } from '../bot';
import { onStart } from '../controllers/app';

bot.onText(/\/start/, onStart);