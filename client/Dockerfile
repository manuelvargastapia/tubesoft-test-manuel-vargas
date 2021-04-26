# Use LTS slim image
FROM node:14.16.1-slim

WORKDIR /usr/src/app

# Copy package.json into the working directory.
# package-lock.json is not copied because it may not
# be present.
COPY package.json .

# Avoid installing dev-dependencies
RUN npm install --only=production

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
