FROM node:18
LABEL authors="igormorozov"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY /app .

ENTRYPOINT ["node", "main.mjs"]