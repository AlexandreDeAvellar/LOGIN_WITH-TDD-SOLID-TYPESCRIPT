FROM node:17

WORKDIR /src

COPY package.json .

RUN npm install