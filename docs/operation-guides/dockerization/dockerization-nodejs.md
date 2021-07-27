# NodeJS

## Overview

This tutorial will describe how to convert your NodeJS application to docker application for compatibility with FarmStack connector.

## Dockerization Process

Create a new file named `Dockerfile` in the application folder and open in your favorite text editor.

```
touch Dockerfile
```

Copy this code into the `Dockerfile`

First we are going to define the image we are going to use. Here we are using latest alpine image of node to keep the size of NodeJS application small. You can use any image available in the [Node's Dockerhub](https://hub.docker.com/_/node).

```bash
FROM node:alpine
```

Next we will create a directory to copy all our application code inside the image.

```bash
# Create app directory
WORKDIR /app
```

Since we are using node image, `node` and `npm` are already installed in this image. We just need to copy our `package.json` and `package-lock.json` files.

```bash
# Copy package.json and package-lock.json files to image
COPY package*.json ./

RUN npm install
```

Here, we copy `package.json` files before copying complete project. This is done to take advantage of Docker layers caching and only install dependencies if the files have changed. You can find more information about this [here](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).

Now we will copy your app's source code to docker image.

```bash
# Copy app's source code
COPY . .
```

Our `sample-nodejs` app binds to port `8081` so we will map this port to docker `daemon` by using `EXPOSE` command. If your app uses any other port, kindly change it

```bash
EXPOSE 8081
```

In this last step, define the command to start your application. Our sample application starts with`npm start` command. You can also use a shell script file here which executes to start your server.

```bash
ENTRYPOINT ["npm","start"]
```

This should be your final `Dockerfile`

{% code title="Dockerfile" %}
```yaml
FROM node:alpine
# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json files to image
ADD package*.json ./

RUN npm install

# Copy app's source code
COPY . .

EXPOSE 8081
ENTRYPOINT [ "npm", "start" ]
```
{% endcode %}

You can find the final `Dockerfile` [here](https://github.com/digitalgreenorg/farmstack-open/blob/main/tools/dockerfiles/NodeJS.Dockerfile).

### .dockerignore file

Create a `.dockerignore` file in the same directory as your `Dockerfile`. Add the following lines to the file:

{% code title=".dockerignore" %}
```bash
node_modules
npm-debug.log
.npm
```
{% endcode %}

## Next Steps

{% page-ref page="../install-a-nodejs-application-with-connector.md" %}

