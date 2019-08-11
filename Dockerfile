FROM node:10-alpine

RUN apk add --update python build-base bzip2

WORKDIR /usr/src/dou-hunter

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]