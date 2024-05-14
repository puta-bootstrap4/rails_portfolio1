
FROM ruby:3.3.0
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN apt install libpq-dev
WORKDIR /app

# ローカルのGemfileとGemfile.lockをコピー
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

# Bundlerを使用してGemをインストール
RUN bundle install


# ローカルのアプリケーションのソースコードをコピー
COPY . /app


# アプリケーションを起動するコマンド
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]

#2024年5/14更新