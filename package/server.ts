import TelegramBot from 'node-telegram-bot-api';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const { version } = require('../package.json');

const { BOT_TOKEN = '', PORT = 80 } = process.env;
const app = new Koa();
const router = new Router();

export const start = (bot: TelegramBot) => {
  router.post('/' + BOT_TOKEN, async ctx => {
    bot.processUpdate(ctx.request.body);
    ctx.status = 200;
  });

  router.get('/', async ctx => {
    ctx.json = { version };
  });
  
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  const server = app.listen(+PORT, '0.0.0.0', () => {
    const { address, port } = server.address();
    console.log(`Web server started at http://${address}:${port}`);
  });
}