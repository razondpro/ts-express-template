FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS base
RUN apk update \
    && apk add --no-cache dumb-init \
    && rm -rf /var/cache/apk/*
WORKDIR /usr/src/app
USER node
COPY --chown=node:node --from=build /usr/src/app/package*.json ./
COPY --chown=node:node --from=build /usr/src/app/ ./node_modules

FROM base AS development
COPY --chown=node:node --from=build /usr/src/app ./
CMD ["dumb-init", "npm", "run", "dev"]

FROM base AS production
ENV NODE_ENV production
COPY --chown=node:node --from=build /usr/src/app/dist ./dist 
RUN npm prune --production
CMD ["dumb-init", "node", "dist/index.js"]

#build: docker build -t username/image-name:0.0.1 --target development .
#run: docker run -v ./:/usr/src/app -p 3000:3000 username/image-name:0.0.1