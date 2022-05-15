FROM node:18-alpine3.14 

RUN rm -rf /usr/local/lib/node_modules/ \
    && rm -rf /usr/local/bin/npm \
    && rm -rf /usr/local/bin/npx 

USER 65532

WORKDIR /app

ENV NODE_PATH /app/node_modules
ENV NODE_ENV production
COPY --chown=65532:65532 ./node_modules ./node_modules
COPY --chown=65532:65532 ./dist ./dist

ENTRYPOINT [ "node", "./dist/server.js"]
