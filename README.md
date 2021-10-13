# DotArt API

DotArt の API です。
実行する際は`docker-compose up`をし立ち上げてから行ってください。

## 環境

言語: TypeScript

FW

- Nest.js
- prisma
- fastify
- swagger

DB

- postgresql
  ※ docker に乗せている

## コマンド

実行

```bash
$ yarn start
```

dev 実行

```bash
$ yarn start:dev
```

デバック実行

```bash
$ yarn start:debug
```

プロダクション実行

```bash
$ yarn start:prod
```

ビルド

```bash
$ yarn build
```

プリビルド

```bash
$ yarn prebuild
```

prisma studio
```bash
$ yarn prisma studio
```

## マイグレーション

マイグレーション

```bash
$ yarn prisma migrate dev --preview-feature
```

@prisma/client からマイグレーションしたものを扱えるように

```bash
$ yarn prisma generate
```

CRUD ジェネレーター

```bash
$ nest g resource

? What name would you like to use for this resource (plural, e.g., "users")? モデル名
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Y
```

## API Document

実行中に以下へアクセスすることで OpenAPI でドキュメントを確認できます。
[http://localhost:5000/api](http://localhost:5000/api)

## 参考

[Nest.js と prisma の連携](https://docs.nestjs.com/recipes/prisma#install-and-generate-prisma-client)

[Nest.js prisma チュートリアル](https://zenn.dev/tossy_yukky/articles/0075f9f0054b39d4ef59#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)

[nest.js + prisma + fastify + postgresql で REST API の CRUD を作成する](https://zenn.dev/devgeeeen/articles/125a076f81b0df#nest.js%E3%81%AEcrud%E3%82%B8%E3%82%A7%E3%83%8D%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B)

[open api のドキュメント生成](https://docs.nestjs.com/openapi/introduction)

[prisma の定義ファイルの書き方](https://www.prisma.io/docs/guides/upgrade-guides/upgrade-from-prisma-1/schema-incompatibilities-postgres#createdat-isnt-represented-in-database)
