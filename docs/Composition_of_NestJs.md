# NestJs の構成

```bash
$ nest g resource

# ex. 名前をusersにしたとする。
```

により以下の階層、ファイルが生成される。

- users
  - dto
    - create-user.dto.ts
    - update-user.dto.ts
  - entities
    - user.entitiy.ts
  - users.controller.spec.ts
  - users.controller.ts
  - users.module.ts
  - users.service.spec.ts
  - users.service.ts

dto は、基本的にデータのベースオブジェクトを定義しそれらを活用しビジネスロジックの定義などを行う

entities は、データのエンティティの定義を行う

controller は、HTTP リクエストを処理し、タスクをサービス層に委ねます。

サービス・レイヤーは、ビジネス・ロジックの大部分が格納される場所です。
service は、リポジトリや DAO を使用して、エンティティの変更や永続化を行います。
