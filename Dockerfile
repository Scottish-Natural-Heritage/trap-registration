################################################################################
# Builder Stage
################################################################################

# we're deploying to the node:16-alpine image, so do our building on it too
FROM node:16-alpine as builder

# node-gyp runs as part of the npm install, so we need to install dependencies
USER root
RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++

# by default, we want to do everything in a non-privileged user, so go to their
# home dir and drop to their account
WORKDIR /home/node
USER node

# copy in the package files so that we can install and build the project
# dependencies
COPY --chown=node:node package*.json ./

# install all the node modules required
RUN npm ci && npm prune --production

################################################################################
# Deployable Image
################################################################################

# we built on the node:16-alpine image, so we need to deploy on it too
FROM node:16-alpine

# drop back to the non-privileged user for run-time
WORKDIR /home/node
USER node

# copy the assets form the builder stage
COPY --chown=node:node --from=builder /home/node/node_modules ./node_modules

# copy the code from the project
COPY --chown=node:node package*.json ./
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./dist ./dist

# these variables are for overriding but keep them consistent between image and
# run
ENV TR_PORT 3000
ENV TR_PATH_PREFIX trap-registration

# these variables are for overriding and they only matter during run
ENV TR_SESSION_SECRET override_this_value
ENV TR_API_URL override_this_value

# this variable is required to ensure our cookies are kept secure
# https://scotthelme.co.uk/tough-cookies/#__secure
ENV COOKIE_PREFIX __Secure-

# let docker know about our listening port
EXPOSE $TR_PORT

# run the default start script, which kicks off a few pre-start things too
CMD ["npm", "start"]
