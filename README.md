# gasTemplate
GAS プロジェクトのテンプレートレポジトリ

## 使用技術一覧
<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<!-- <img src="https://img.shields.io/badge/{バッジ左の文字}-{バッジ右の文字}-{色}.svg?logo={ロゴ名}&style=for-the-badge"> -->
<!-- ロゴは simpleIcon https://simpleicons.org/ から選べる -->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <!--<img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-TailwindCSS-000000.svg?logo=tailwindcss&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> 
  -->
  <!-- バックエンドのフレームワーク一覧 -->
  <!--
  <img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=for-the-badge">
  -->
  <!-- バックエンドの言語一覧 -->
  <!-- <img src="https://img.shields.io/badge/-GAS-4285F4.svg?logo=googleappsscript&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Python-F2C63C.svg?logo=python&style=for-the-badge">
  -->
  <!-- ミドルウェア一覧 -->
  <!--
  <img src="https://img.shields.io/badge/-Nginx-269539.svg?logo=nginx&style=for-the-badge">
  <img src="https://img.shields.io/badge/-MySQL-4479A1.svg?logo=mysql&style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/-Gunicorn-199848.svg?logo=gunicorn&style=for-the-badge&logoColor=white">
  -->
  <!-- インフラ一覧 -->
  <!--
  <img src="https://img.shields.io/badge/-Google%20cloud-4285F4.svg?logo=google-cloud&style=for-the-badge">
  
 <!--  <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge">
  <img src="https://img.shields.io/badge/-githubactions-FFFFFF.svg?logo=github-actions&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Amazon%20aws-232F3E.svg?logo=amazon-aws&style=for-the-badge">
  <img src="https://img.shields.io/badge/-terraform-20232A?style=for-the-badge&logo=terraform&logoColor=844EBA">
  -->
</p>

## 目次

## プロジェクトの概要
- プロジェクトの概要
- プロジェクトの詳細が記載された資料のリンク

## 必要な環境変数やコマンド一覧
## ディレクトリ構成
## 開発環境の構築方法
### clasp
```
npm init -y
npm i @google/clasp -g --save-dev
npm install @types/google-apps-script
```

.clasp.json ファイルを作成し、下記の設定を記入する
```
{
    "scriptId": "{連携するGASのスクリプトID}",
    "rootDir": "./",
    "filePushOrder": ["Code.gs", "funcs.gs","findNext.gs","DrDHCalCheck.gs","syncCalender.gs","test.gs","dialog.html"] //アップロードするファイルの並び順を指定
  }
```

```
clasp login
```

```clasp login``` を実行すると、google の認証画面へのリンクがターミナルに表示されるので、そのリンクを開いて認証を行う。
その際、gitHub codespace などの web container 環境では「サイトにアクセスできません」画面になってしまう。その場合の解決方法は以下の zenn 記事を参照。

[devcontainer で clasp がログインできない](https://zenn.dev/st_little/articles/can-not-clasp-login-with-devcontainer)

settings.json に下記を追加（.gs ファイルに js like なシンタックスハイライトをつけるため）

### GAS のシンタックスハイライト
```javascript
"files.associations": {
            "*.gs": "javascript"
        },
```

## トラブルシューティング

