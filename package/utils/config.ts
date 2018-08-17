export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const BASE_URL = IS_PROD
  ? process.env.HEROKU_URL
  : `http://0.0.0.0:${process.env.PORT}`;
