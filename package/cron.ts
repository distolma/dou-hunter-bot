import axios from 'axios';
import ms from 'ms';

import { BASE_URL } from './utils/config';

const client = axios.create({ baseURL: BASE_URL });

export function cron() {
  client.get('/hunt');

  setInterval(() => {
    client.get('/hunt');
  }, ms('30m'));
}
