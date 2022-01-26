export class Constants {
  // プロフィール情報
  public static readonly PROPERTY_ID = '自動付番id';
  public static readonly PROPERTY_USER_ID = 'ユーザid';
  public static readonly PROPERTY_EMAIL = 'メールアドレス';
  public static readonly PROPERTY_PASSWORD = 'パスワード';
  public static readonly PROPERTY_NAME = 'フルネーム';
  public static readonly PROPERTY_ROLE = 'アカウント権限';
  // アカウント認証系
  public static readonly PROPERTY_EMAIL_VERIFIED = 'メール認証されているか';
  public static readonly PROPERTY_HASH_ACTIVETION = 'メール認証番号';
  public static readonly PROPERTY_ACTIVE = 'アカウントが有効か';
  public static readonly PROPERTY_LOGIN_TYPE =
    'ログインにどの認証をつかっているか';
  // 日付等
  public static readonly PROPERTY_CREATED_AT = 'アカウント作成日';
  public static readonly PROPERTY_UPDATED_AT = 'アカウント情報更新日';
  public static readonly PROPERTY_CONFIRMED_AT = 'アカウント認証日';
  // 外部情報
  public static readonly PROPERTY_USER_PALLET = 'ユーザパレット情報';

  // Token情報
  public static readonly PROPERTY_TOKEN = 'トークン情報';
  public static readonly PROPERTY_REFRESH_TOKEN = 'リフレッシュトークン情報';
  public static readonly PROPERTY_EMAIL_TOKEN = 'Emailトークン情報';
  public static readonly PROPERTY_PASSWORD_TOKEN = 'パスワードトークン情報';

  // エラー系
  public static readonly IS_NOT_EMPTY_USER_ID = 'ユーザIDが含まれていません。';
  public static readonly IS_NOT_EMPTY_EMAIL =
    'メールアドレスが含まれていません。';
  public static readonly IS_NOT_EMPTY_PASSWORD =
    'パスワードが含まれていません。';
  public static readonly IS_NOT_EMPTY_NAME = 'フルネームが含まれていません。';
  public static readonly IS_NOT_EMPTY_EMAIL_TOKEN =
    '認証トークンが含まれていません。';
  public static readonly IS_NOT_EMPTY_PASSWORD_TOKEN =
    'パスワード認証トークンが含まれていません。';

  // 制限系
  public static readonly IS_EMAIL = 'メールアドレスが不正な形式です。';
  public static readonly MIN_LENGTH_PASSWORD =
    'パスワードは8文字以上にしてください。';

  // 認証系
  public static readonly VERIFY_STATUS = 'ステータスコード';
  public static readonly VERIFY_MESSAGE = 'ステータスメッセージ';

  // UserPallet DTO
  public static readonly PROPERTY_PALLET_NAME = 'パレット名';
  public static readonly PROPERTY_PALLET_DATA = 'パレットデータ';

  // BasicPallet DTO
  public static readonly PROPERTY_BASIC_PALLET_ID = 'ベーシックパレットID';
  public static readonly PROPERTY_BASIC_PALLET_NAME = 'ベーシックパレット名';
  public static readonly PROPERTY_BASIC_PALLET_DESCRIPTION =
    'ベーシックパレットの説明';
  public static readonly PROPERTY_BASIC_PALLET_DATA =
    'ベーシックパレットデータ';

  // Canvases DTO
  public static readonly PROPERTY_CANVAS_ID = 'キャンバスID';
  public static readonly PROPERTY_CANVAS_NAME = 'キャンバス名';
  public static readonly PROPERTY_CANVAS_RANGE = 'キャンバスサイズ';
  public static readonly PROPERTY_PALLET = '選択されたベーシックパレット情報';
  public static readonly PROPERTY_CANVASES_DATA = 'キャンバス情報';

  // Linebot Prefix
  public static readonly LINE_BOT_PREFIX = [
    'dotart',
    'DotArt',
    'Dotart',
    'dotArt',
  ];

  // image uploader
  public static readonly PROPERTY_IMAGE_UPLOADER_ID =
    'base64エンコードされた画像';
}
