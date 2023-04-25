FROM node:18-alpine
LABEL authors="igormorozov"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY /pub .

ENTRYPOINT ["node", "bot.js"]