import { registerAs } from '@nestjs/config';

interface Config {
  token: string;
  sitePublicUrl: string;
}

export default registerAs(
  'bot',
  (): Config => ({
    token: process.env.BOT_TOKEN,
    sitePublicUrl: process.env.PUBLIC_URL,
  }),
);
