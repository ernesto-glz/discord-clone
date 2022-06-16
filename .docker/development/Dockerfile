FROM node:16

RUN mkdir -p /app
WORKDIR /app

COPY ./backend/package.json ./backend/yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "dev"]