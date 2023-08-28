FROM node:18.17-alpine3.17
LABEL authors="igormorozov"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY /app .

ENTRYPOINT ["node", "main.mjs"]