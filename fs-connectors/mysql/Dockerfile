FROM node:alpine

WORKDIR /app

ADD package.json .
RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

ENTRYPOINT [ "node", "." ]