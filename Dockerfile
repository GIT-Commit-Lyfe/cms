FROM --platform=linux/amd64 node:lts-buster

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

RUN yarn generate

EXPOSE 3000

CMD ["yarn", "start"]
