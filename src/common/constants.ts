export class Constants {
  // User DTO
  public static readonly PROPERTY_ID = '自動付番id';
  public static readonly PROPERTY_USER_ID = 'ユーザid';
  public static readonly PROPERTY_EMAIL = 'メールアドレス';
  public static readonly PROPERTY_PASSWORD = 'パスワード';
  public static readonly PROPERTY_NAME = 'フルネーム';
  public static readonly PROPERTY_ROLE = 'アカウント権限';
  public static readonly PROPERTY_EMAIL_VERIFIED = 'メール認証されているか';
  public static readonly PROPERTY_HASH_ACTIVETION = 'メール認証番号';
  public static readonly PROPERTY_ACTIVE = 'アカウントが有効か';
  public static readonly PROPERTY_CREATED_AT = 'アカウント作成日';
  public static readonly PROPERTY_UPDATED_AT = 'アカウント情報更新日';
  public static readonly PROPERTY_CONFIRMED_AT = 'アカウント認証日';
  public static readonly PROPERTY_USER_PALLET = 'ユーザパレット情報';
  public static readonly PROPERTY_TOKEN = 'トークン情報';
  // エラー系
  public static readonly IS_NOT_EMPTY_USER_ID = 'ユーザIDが含まれていません。';
  public static readonly IS_NOT_EMPTY_EMAIL =
    'メールアドレスが含まれていません。';
  public static readonly IS_NOT_EMPTY_PASSWORD =
    'パスワードが含まれていません。';
  public static readonly IS_NOT_EMPTY_NAME = 'フルネームが含まれていません。';
  // 制限系
  public static readonly IS_EMAIL = 'メールアドレスが不正な形式です。';
  public static readonly MIN_LENGTH_PASSWORD =
    'パスワードは8文字以上にしてください。';
  // 認証系
  public static readonly VERIFY_STATUS = 'ステータスコード';
  public static readonly VERIFY_MESSAGE = 'ステータスメッセージ';
}
