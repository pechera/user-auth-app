FROM node:22.11.0

WORKDIR /user-auth-app

COPY yarn.lock .
COPY package.json .
COPY tsconfig.json .

RUN yarn install

EXPOSE 3000

COPY src ./src
COPY drizzle.config.ts ./
COPY development.env .env

RUN yarn build

CMD ["node", "./dist/src/main.js"]
