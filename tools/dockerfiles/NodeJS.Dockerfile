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