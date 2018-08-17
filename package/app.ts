import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { AddressInfo } from 'net';

import { routes } from './routes/app';
import { cron } from './cron';
import './routes/bot';

const { PORT } = process.env;
const app = new Koa();

app.use(bodyParser());
app.use(routes);

const server = app.listen(PORT || 80, () => {
  const { address, port } = server.address() as AddressInfo;
  console.log(`Web server started at ${address}:${port}`);

  cron();
});

process.on('unhandledRejection', reason => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
});
