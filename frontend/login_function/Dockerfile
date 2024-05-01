# Node.jsの特定バージョンを使用するために公式イメージを指定
FROM node:20.11.1

WORKDIR /app

# 依存関係ファイルをコピーしてインストール
COPY package.json package-lock.json /app/
RUN npm install

# アプリケーションのソースをコピー
COPY . /app

# アプリケーションを起動
CMD ["npm", "start"]
