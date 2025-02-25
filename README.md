# Devotel API Integration Demo

## Overview

Framework: [Nestjs](https://nestjs.com/) </br>
Database: [PostgreSql](https://www.postgresql.org/) </br>
ORM: [Prisma](https://www.prisma.io/) </br>
Swagger: [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) </br>
Schedule: [@nestjs/schedule](https://docs.nestjs.com/techniques/task-scheduling) </br>
Queue: [@nestjs/bull](https://docs.nestjs.com/techniques/queues#bull-installation) </br>

## Providers Url

One: [https://assignment.devotel.io/api/provider1/jobs](https://assignment.devotel.io/api/provider1/jobs) </br>
Two: [https://assignment.devotel.io/api/provider2/jobs](https://assignment.devotel.io/api/provider2/jobs) </br>

## Environments

```ts
APP_PORT: application running port, 3000

REDIS_HOST: redis host value, 'localhost'
REDIS_PORT: redis port value, '6379'

SWAGGER_RUN_STATUS: swagger running status, 'on' or 'off'

PROVIDER_ONE_RUN_STATUS: provider one running status, 'on' or 'off'
PROVIDER_TWO_RUN_STATUS: provider two running status, 'on' or 'off'

DATABASE_URL: database url configuration,  'postgresql://postgres:12345678@localhost:5432/devotel_demo_db?schema=public'
```

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run dev

# production mode
$ pnpm run prod
```

## ER Diagram

![screenshot](er_db.png)

## Author

[Mostafa Gholami](https://mst-ghi.github.io/)
