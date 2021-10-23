FROM node:alpine

WORKDIR /app

ADD package.json .
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "node", "." ]