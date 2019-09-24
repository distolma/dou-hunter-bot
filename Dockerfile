FROM node:alpine AS base

FROM base AS builder
WORKDIR /usr/src/builder
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
RUN cp -r dist /tmp/dou-hunter-dist

FROM base
WORKDIR /usr/src/dou-hunter
COPY --from=builder /tmp/dou-hunter-dist ./dist
COPY package*.json ./
RUN npm ci

CMD [ "npm", "start" ]
