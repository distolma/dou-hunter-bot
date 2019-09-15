import Router from '@koa/router';

import { hunt, botWebhook } from '../controllers/app';
import { tokens } from '../middlewares/tokens';
import { activeUsers } from '../middlewares/active-users';

const router = new Router();
const { BOT_TOKEN } = process.env;

router.get('/hunt', tokens, activeUsers, hunt);
router.post(`/bot${BOT_TOKEN}`, botWebhook);

export const routes = router.routes();
