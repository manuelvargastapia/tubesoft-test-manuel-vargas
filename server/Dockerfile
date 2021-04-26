# Use LTS image
FROM node:14.16.1

WORKDIR /usr/src/app

# Copy package.json into the working directory.
# package-lock.json is not copied because it may not
# be present.
COPY package.json .

# Avoid installing dev-dependencies
RUN npm install --only=production

# express-joi-validation depends on "joi" and is explicitely
# used in code
RUN npm install joi

COPY . .

# Give execution permissions to entrypoint.sh
RUN chmod +x ./scripts/entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "./scripts/entrypoint.sh" ]