FROM node:alpine AS base
# install devtools
RUN apk add g++ make python3

FROM base AS builder
WORKDIR /usr/src/builder
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM base
WORKDIR /usr/src/dou-hunter
COPY --from=builder /usr/src/builder ./dist
COPY package*.json ./
RUN npm ci

CMD [ "npm", "start" ]
