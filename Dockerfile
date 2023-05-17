FROM node:20 AS builder
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
ENV NODE_ENV production
COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . .
CMD ["dumb-init", "node", "dist/index.js"]