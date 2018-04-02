import './db';
import './routes';

import { hunt, initialRequest } from './controllers/rss';

(async function() {
  await initialRequest();

  setInterval(async () => hunt(), 30 * 60000);
})();
