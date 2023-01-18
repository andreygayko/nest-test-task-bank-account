<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Тестовая задача Back-end. node.js
Управление банковским аккаунтом
Технологии:

1. Postgres
2. Node.js
3. NestJS
4. Swagger
5. Git
6. NPM/Yarn
7. TypeScript

Задание
Необходимо реализовать модули для системы управления пользователями.
Реализовать REST API для операций по осуществлению банковский транзацкий.

Сущности:
Аккаунт
id uuid
person_id uuid
balance float
daily_withdrawal_limit float
active boolean
account_type integer
create_date date
Транзакция
id uuid
account_id uuid
value float
transaction date date
Клиент
id uuid
name text
document text
birth_date date

Минимально необходимый функционал:

1. Создание аккаунта
2. Пополнение счета
3. Получение текущего баланса
4. Снятие со счета
5. Блокировка аккаунта
6. История транзакций
7. Ограничение по количеству запросов на получение текущего счета в день(без
   дополнительных таблиц)
8. Проверка, откуда приходят запросы и запрет, если запрос из неизвестного
   источника

Будет плюсом:

1. Наличие инструкции для запуска
2. Написана документация с краткой информацией о решении
3. Покрытие тестами
4. Предусмотрена обработка ошибок и отказоустойчивость
5. Проработанная архитектура проекта

На тестовое задание отводится 1-2 дня

## Installation

```bash
$ npm install
```

## Running the app

```bash
# run database requires docker
$ docker-compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash

# e2e tests
$ npm run test:e2e

```

## Doc

Swagger document with all the info about urls/entities is awailable at: http://localhost:3000/api/docs

Balance request http://localhost:3000/account/balance?id={id} has number limitation, 5 by default, can be configured in .env

CORS is unlocked for 'https://docs.nestjs.com' for demo purposes

## License

Nest is [MIT licensed](LICENSE).
