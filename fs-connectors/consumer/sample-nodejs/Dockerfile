FROM node:alpine

WORKDIR /app

ADD package*.json .

RUN npm install

COPY . .

EXPOSE 8081

ENTRYPOINT [ "npm", "start" ]