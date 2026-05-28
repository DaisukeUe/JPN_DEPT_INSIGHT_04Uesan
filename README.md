#

プロジェクト名 -日本国債金利ダッシュボード

#

概要 -日本国債の金利を視覚的に表現して金融行動に役立てる事ができます。

        -選択した金利の種類を任意の期間で取得してチャートにします。
         表示した金利の設定をお気に入りに保存して、いつでも呼び出す事ができます。

#

メイン画面のデモ画像
![alt text](<スクリーンショット 2026-05-26 21.57.27.png>)

#

機能・特徴

    -見やすい国債金利チャートはこのアプリだけ

#

技術スタック

    -フロントエンド:React 19, TypeScript, ReduxToolkit, CSS
    -バックエンド:Node.js, Express, knex, PostgreSQL
    -インフラ:ーー

#

インストール・セットアップ
-Node.js 24以上
-npm 11以上

    -1 .git clone  git@github.com:DaisukeUe/btc-fullstack.git
    -2 cd btc-fullstack
    -3 npm install
    -4 npm run dev
    -5 cd front
    -6 npm install
    -7 npm run dev

    -8 データベースのセットアップ　npm run migrate:latest

#

使用方法

    -1. アカウント作成:トップページからサインアップページへ行き「ユーザー登録」
    -2. 登録した情報でログイン
    -3. メイン画面で表示したい国債の金利を選択してリクエストボタンを押す
    -4. 表示中の設定に名前を付けてお気に入り登録する:「登録ボタンを押す」
    -5. お気に入り登録モーダルで登録:モーダルを表示「お気に入り登録モーダル表示ボタン」
    -6. 設定後のお気に入りは選択プルダウンに付けた名前で登録されているので選択して表示する。

#

デプロイ

    -renderサイト. https://btc-fullstack-uesan-01.onrender.com

#

ディレクトリ構成

    ├── backup
    │ ├── \_knex.js
    │ ├── \_knexfile.js
    │ ├── 001_user.js
    │ ├── 20260521084601_create_user_table.js
    │ ├── 20260521084654_create_dept_table.js
    │ └── backap.tsx
    ├── db
    │ └── data
    │ ├── migrations
    │ │ ├── 20260522064403_create_users_table.ts
    │ │ ├── 20260522064421_create_dept_table.ts
    │ │ └── 20260525060732_solt_update_length**users.ts
    │ └── seeds
    │ ├── 001_users.ts
    │ └── 002_dept.ts
    ├── front
    │ ├── eslint.config.js
    │ ├── index.html
    │ ├── package-lock.json
    │ ├── package.json
    │ ├── public
    │ │ ├── favicon.svg
    │ │ └── icons.svg
    │ ├── README.md
    │ ├── setupTests.ts
    │ ├── src
    │ │ ├── **tests\_\_
    │ │ │ └── login.test.tsx
    │ │ ├── App.css
    │ │ ├── App.tsx
    │ │ ├── assets
    │ │ │ ├── hero.png
    │ │ │ ├── react.svg
    │ │ │ └── vite.svg
    │ │ ├── components
    │ │ │ ├── favoriteModal.css
    │ │ │ ├── FavoriteModal.tsx
    │ │ │ ├── indicator.css
    │ │ │ ├── login.css
    │ │ │ ├── Login.tsx
    │ │ │ ├── navbar.css
    │ │ │ ├── Navber.tsx
    │ │ │ ├── showFavoriteChange.css
    │ │ │ ├── ShowFavoriteChange.tsx
    │ │ │ └── SignUp.tsx
    │ │ ├── index.css
    │ │ ├── main.tsx
    │ │ ├── Roots.tsx
    │ │ ├── slices
    │ │ │ ├── dataSlice.ts
    │ │ │ ├── deptSlice.ts
    │ │ │ ├── loginSlice.ts
    │ │ │ └── userSlice.ts
    │ │ ├── store.ts
    │ │ └── type.ts
    │ ├── tsconfig.app.json
    │ ├── tsconfig.json
    │ ├── tsconfig.node.json
    │ ├── vite.config.test.ts
    │ └── vite.config.ts
    ├── knex.ts
    ├── knexfile.ts
    ├── package-lock.json
    ├── package.json
    ├── public
    │ ├── assets
    │ │ ├── index-B-HSuN3k.css
    │ │ └── index-DVab1NFK.js
    │ ├── favicon.svg
    │ ├── icons.svg
    │ └── index.html
    ├── README.md
    ├── server.ts
    ├── test
    │ ├── setup.ts
    │ └── views.test.ts
    ├── test-double
    │ └── views.double.test.ts
    ├── tsconfig.json
    ├── tsconfig.test.json
    ├── type_backend.ts
    ├── view
    │ ├── views.ts
    │ └── viewsRepository.ts
    └── スクリーンショット 2026-05-26 21.57.27.png
