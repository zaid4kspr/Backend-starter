## Express.js server with TypeORM, PostgreSQL integration via Docker, and TypeScript configuration
![image](https://github.com/zaid4kspr/Backend-starter/assets/24481504/e63ba665-c413-4984-be28-03431ee2e19d)

Apis: Login, register and me

## 💎 The Package Features

<p>
  <img src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=TypeScript&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=fff" />&nbsp;&nbsp;
</p>
<p>
  <img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=fff" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=000" />&nbsp;&nbsp;
  <img src="https://img.shields.io/badge/-Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=000" />
  <img src="https://img.shields.io/badge/-SWC-FFFFFF?style=for-the-badge&logo=swc&logoColor=FBE1A6" />
</p>
<p>
  <img src="https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=PostgreSQL&logoColor=fff" />&nbsp;&nbsp;
</p>

## 🐳 Docker :: Container Platform

- starts the containers in the background and leaves them running : `docker-compose up -d`
- Stops containers and removes containers, networks, volumes, and images : `docker-compose down`


## ✨ ESLint, Prettier :: Code Formatter

It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

1. Install [VSCode](https://code.visualstudio.com/) Extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 📗 Swagger :: API Document

[Swagger](https://swagger.io/) is Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset.

Easily used by Swagger to design and document APIs at scale.

Start your app in development mode at `http://localhost:3000/api-docs`


## 🏎 SWC :: a super-fast JavaScript / TypeScript compiler

[SWC](https://swc.rs/) is an extensible Rust-based platform for the next generation of fast developer tools.

`SWC is 20x faster than Babel on a single thread and 70x faster on four cores.`

- tsc build :: `npm run build`
- swc build :: `npm run build:swc`


## 🗂 Code Structure

```sh
│
├──📂 .vscode
│  ├── launch.json
│  └── settings.json
│
├──📂 src
│  ├──📂 config
│  │  └── index.ts
│  │
│  ├──📂 controllers
│  │  ├── auth.controller.ts
│  │  └── users.controller.ts
│  │
│  ├──📂 dtos
│  │  └── users.dto.ts
│  │  └── photos.dto.ts
│  │
│  ├──📂 exceptions
│  │  └── httpException.ts
│  │
│  │
│  ├──📂 interfaces
│  │  ├── auth.interface.ts
│  │  ├── clients.interface.ts
│  │  ├── photos.interface.ts
│  │  ├── routes.interface.ts
│  │  └── users.interface.ts
│  │
│  ├──📂 middlewares
│  │  ├── auth.middleware.ts
│  │  ├── error.middleware.ts
│  │  ├── photoUpload.middleware.ts
│  │  └── validation.middleware.ts
│  │
│  ├──📂 entities
│  │  └── users.entity.ts
│  │  ├── clients.entity.ts
│  │  └── photos.entity.ts
│  │
│  ├──📂 routes
│  │  ├── auth.route.ts
│  │  └── users.route.ts
│  │
│  ├──📂 services
│  │  ├── auth.service.ts
│  │  ├── photos.service.ts
│  │  └── users.service.ts
│  │
│  ├──📂 utils
│  │  ├── logger.ts
│  │  └── vaildateEnv.ts
│  │
│  ├── app.ts
│  └── server.ts
│
├── .dockerignore
├── .editorconfig
├── .env.development.local
├── .env.production.local
├── .env.test.local
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .huskyrc
├── .lintstagedrc.json
├── .prettierrc
├── .swcrc
├── docker-compose.yml
├── Dockerfile.dev
├── Dockerfile.prod
├── ecosystem.config.js
├── jest.config.js
├── Makefile
├── package-lock.json
├── package.json
├── swagger.yaml
└── tsconfig.json
```



