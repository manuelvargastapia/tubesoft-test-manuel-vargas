# Use LTS slim image
FROM node:14.16.1-slim

WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
# to ensure installing the exact same dependencies as in host machine
COPY package.json .
COPY package-lock.json .

# Avoid installing dev-dependencies
RUN npm install --only=production

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
