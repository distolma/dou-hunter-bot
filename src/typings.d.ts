declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE: string;
    NODE_ENV: string;
    BOT_TOKEN: string;
    PUBLIC_URL: string;
  }
}
