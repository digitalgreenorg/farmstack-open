# Download the node base image.
FROM node:alpine

# Create a working directory on the image.
WORKDIR /app

# Copy all the contents from current directory to working directory.
COPY . .

# Install node dependencies in Docker Image.
RUN npm install

# Expose a port.
EXPOSE 3000

# Run the node server.
ENTRYPOINT ["npm", "start"]