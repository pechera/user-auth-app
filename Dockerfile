FROM node:22.11.0

WORKDIR /user-auth-app

COPY yarn.lock .
COPY package.json .
COPY tsconfig.json .

RUN yarn install

EXPOSE 3000

COPY src /user-auth-app/src

RUN yarn build

COPY development.env .env

CMD ["node", "./dist/index.js"]
