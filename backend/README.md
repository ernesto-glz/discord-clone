## Description

Discord clone backend using NodeJS, Express, MongoDB, Socket.IO and Json Web Tokens

## Requirements

- NodeJS
- MongoDB
- and/or Docker

## Development Setup

Install the dependencies:

```bash
yarn install
```

Set the environment variables in the `.env` file using the `.env.example` file as an example.

```bash
cp .env.example .env
```

If you have docker you can skip all this and directly launch the development environment using:

```bash
docker compose up
or
yarn run docker:dev
```

