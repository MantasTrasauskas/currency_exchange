FROM node:18-alpine3.14 

RUN rm -rf /usr/local/lib/node_modules/ \
    && rm -rf /usr/local/bin/npm \
    && rm -rf /usr/local/bin/npx 

USER node

WORKDIR /app

EXPOSE 8443

ENV NODE_PATH /app/node_modules
ENV NODE_ENV production
COPY --chown=node:node ./node_modules ./node_modules
COPY --chown=node:node ./dist ./dist
COPY --chown=node:node ./cert.pem .
COPY --chown=node:node ./key.pem .
COPY --chown=node:node ./package.json .
COPY --chown=node:node ./.env .

ENTRYPOINT [ "node", "./dist/app.js"]
