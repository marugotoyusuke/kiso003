# 情報工学基礎 小テスト③対策

M5Stackの授業から、高校「情報」の標準的な知識へつなぐ学習用Webサイトです。

- `index.html`：解説。五大装置、主記憶と補助記憶、ハードとソフト、OS、GUI/CUI、使いやすさを整理。
- `quiz.html`：選択24問（4テーマ×6問）と記述練習4問。自動採点、理由の解説、テーマ別出題、間違い・未回答の復習付き。
- `assets/style.css`：共通デザイン。スマートフォンと印刷に対応。
- `assets/learn.js`：カウンターの体験デモ。
- `assets/questions.js`：問題、正解、解説、記述の解答例。
- `assets/quiz.js`：問題表示、採点、復習の処理。

HTML・CSS・JavaScriptのみ。ビルド、インストール、外部ライブラリ、APIキーは不要です。ZIPを解凍して `index.html` をダブルクリックすれば、手元でも利用できます。回答や記述内容は外部送信・永続保存されず、再読み込みすると消えます。

## GitHub Pagesで公開する

1. ダウンロードしたZIPを解凍します。
2. GitHubにサインインし、右上の「＋」→「New repository」で新しいリポジトリを作ります。名前の例は `information-study`。一般公開する教材として「Public」を選択します。
3. リポジトリの「Add file」→「Upload files」を開きます。空のリポジトリなら「uploading an existing file」から開けます。
4. 解凍した `m5stack-study` フォルダの**中身**をアップロードします。`index.html` と `quiz.html` がリポジトリの直下、`assets` がその直下のフォルダになるようにします。ZIPそのものや外側の `m5stack-study` フォルダを入れないでください。
5. 「Commit changes」で保存します。初期ブランチ名は通常 `main` です。
6. リポジトリの「Settings」→左メニュー「Pages」を開きます。
7. 「Build and deployment」の「Source」で **Deploy from a branch** を選びます。
8. 「Branch」で **main**、フォルダで **/ (root)** を選び、「Save」を押します。初期ブランチを別名にした場合はそのブランチを選びます。
9. 公開処理の完了後、「Pages」に表示されるURLを開きます。通常は `https://ユーザー名.github.io/information-study/` です。完了まで少し時間がかかる場合があります。
10. 解説ページとサンプル問題ページを開き、問題の採点まで確認してから、学生へURLを共有します。

公開すると、教材とソースコードはインターネット上で閲覧できるようになります。元の授業PDFは同梱していません。

### 公開できないとき

- 404になる：`index.html` が指定した公開元（main / root）にあるか、Pagesの処理が完了したかを確認します。
- デザインや問題が表示されない：`assets` フォルダの3つのJSファイルとCSSを、フォルダ構成のままアップロードしたか確認します。
- 学校アカウントでPublicやPagesを選べない：所属組織の権限・公開設定を管理者に確認してください。
- 更新を反映したい：対象ファイルを同じ場所へアップロードし、Commit changesを実行します。

公式手順：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 教材の使い方

まず解説を読み、授業の作品を「入力・処理・出力・記憶」で説明します。その後、サンプル問題を解いて採点します。間違った問題の理由を読み、必要なら解説に戻り、間違い・未回答の問題だけを解き直します。記述は解答例を丸暗記せず、確認ポイントを満たしているか自己確認します。

サンプル問題の各1点は練習用の配点です。本番の出題・配点の予告ではありません。Wi-Fi・ネットワークやプログラム文法の細部は対象外です。

## 編集する場合

解説は `index.html` を編集します。選択問題・記述問題は `assets/questions.js` を編集します。選択問題の `answer` は0始まり（0＝ア、1＝イ、2＝ウ、3＝エ）です。問題数を変更する場合は、`quiz.html`・`index.html`・このREADMEの問題数表記も合わせて変更してください。ファイルはUTF-8で保存します。

## 参照した資料

- 授業資料「情報工学基礎 #7 はじめてのM5stack」（提供された `20261116_情報工学基礎_m5stack.pdf`）。元PDFは配布物に含めていません。
- 文部科学省「高等学校情報科『情報Ⅰ』教員研修用教材 第3章 JavaScript版」：https://www.mext.go.jp/content/20200716-mxt_jogai01-000001169_001.pdf
- M5Stack公式 Core2：https://docs.m5stack.com/en/core/core2
