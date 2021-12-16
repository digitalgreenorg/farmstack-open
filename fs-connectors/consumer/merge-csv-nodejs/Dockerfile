FROM node:alpine

WORKDIR /app

ADD package.json .
RUN npm install

ADD app.js .
ADD views ./views
ADD public ./public

EXPOSE 8081

ENTRYPOINT [ "node", "app.js" ]