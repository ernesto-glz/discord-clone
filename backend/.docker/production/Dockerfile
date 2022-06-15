FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY src ./src
COPY tsconfig.prod.json .

RUN yarn build

CMD ["yarn", "start"]
