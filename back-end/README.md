## Description

Project that allows clients to book one or more personal training sessions for padel, fitness, or tennis.

## Deployment
- Database is deployed on [https://neon.tech](https://neon.tech)
- Back-end server is deployed on [https://railway.com](https://railway.com)

## 💻 Stack

- [nestjs/typeorm](https://github.com/nestjs/typeorm): Integration of TypeORM with NestJS for database management.
- [nestjs/swagger](https://github.com/nestjs/swagger): Generates OpenAPI (Swagger) documentation for the NestJS application.
- [nestjs/jwt](https://github.com/nestjs/jwt): JWT (JSON Web Token) authentication module for NestJS.
- [nestjs/passport](https://github.com/nestjs/passport): Authentication module for NestJS that supports various strategies.
- [nestjs/config](https://github.com/nestjs/config): Configuration module for NestJS applications.

## 🚀 Run Locally

1. Set up env
   Create `.env` file and copy all data from `.env.example`
2. If you want to use the docker-compose file:

```sh
docker compose up -D
```

3.Install the dependencies with one of the package managers listed below:

```bash
npm install
```

4.Start the development mode:

```bash
npm start:dev
```
