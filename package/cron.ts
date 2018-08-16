import axios from 'axios';
import ms from 'ms';

const client = axios.create({
  baseURL: `${process.env.HEROKU_URL}`,
});

export function cron() {
  client.get('/hunt');

  setInterval(() => {
    client.get('/hunt');
  }, ms('30m'));
}