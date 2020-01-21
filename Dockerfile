FROM node:12.3.1-alpine AS node_base

FROM node_base AS deps
WORKDIR /usr/app
COPY package.json /usr/app/package.json
COPY yarn.lock /usr/app/yarn.lock

RUN yarn install

FROM node_base AS build
WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules /usr/app/node_modules
COPY . /usr/app
RUN yarn build:prod

FROM node_base AS app
WORKDIR /usr/app
COPY --from=build /usr/app/dist /usr/app/

CMD ["node", "index.js"]
