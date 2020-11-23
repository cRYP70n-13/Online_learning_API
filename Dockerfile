FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --save

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]