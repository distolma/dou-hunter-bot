import TelegramBot from 'node-telegram-bot-api';

const { BOT_TOKEN } = process.env;

export let bot = new TelegramBot(BOT_TOKEN, { polling: true });
