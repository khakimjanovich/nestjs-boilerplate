# NestJS REST API boilerplate 

## Description

NestJS REST API boilerplate for typical project

## Table of Contents

- [Features](#features)
- [Comfortable development](#comfortable-development)
- [Tests](#tests)

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Sign in and sign up via email.
- [x] Admin and User roles.
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## Comfortable development

```bash
git clone https://github.com/brocoders/nestjs-boilerplate.git my-app
cd my-app/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

## Automatic update of dependencies

If you want to automatically update dependencies, you can connect [Renovate](https://github.com/marketplace/renovate) for your project.

## Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable 
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker-compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker-compose -p ci rm -svf
```

## Test benchmarking

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```
