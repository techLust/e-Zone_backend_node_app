FROM node:18-alpine
# Creating a node user

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    apk add git && \
    rm -rf /var/cache/apk/*
RUN openssl version
RUN node --version

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ./package.json ./
# USER appuser
USER node
RUN npm install;    
# COPY ./s3.js ./node_modules/s3-proxy/lib/s3.js
USER root
RUN apk del git
USER node
COPY --chown=node:node . ./
# COPY . ./
EXPOSE 9000
CMD ["npm","run","dev"]