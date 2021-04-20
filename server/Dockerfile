# Use LTS slim image
FROM node:14.16.1

WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
# to ensure installing the exact same dependencies as in host machine
COPY package.json .
COPY package-lock.json .

# Avoid installing dev-dependencies
RUN npm install --only=production

# express-joi-validation depends on "joi" and is explictely
# used in code
RUN npm install joi

COPY . .

# Give execution permissions to entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "./entrypoint.sh" ]