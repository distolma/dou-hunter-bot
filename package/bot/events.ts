import { bot } from './config';
import { onStart } from '../actions';

bot.onText(/\/start/, onStart);