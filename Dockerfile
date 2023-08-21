# ADD NOTE

FROM node:16.16-alpine AS base

ARG PORT=3000

ENV PORT ${PORT}
EXPOSE ${PORT}

WORKDIR /usr/src/app
RUN chown node:node -R /usr/src/app
RUN npm install --location=global npm@8.11.0

FROM base AS deps

COPY --chown=node:node package* ./
# NOTE: if use kaniko to build and cache,
# somehow kaniko already set NODE_ENV to production
# when didn't even specific ARG NODE_ENV
# so npm ci always install only production
# must include --also force devDeps to install

RUN npm ci --unsafe-perm --include=dev
COPY --chown=node:node . ./
ARG NODE_ENV=production
RUN NODE_ENV=${NODE_ENV} npm run build
RUN npm prune --omit=dev

FROM base AS release

ARG NODE_ENV=production
COPY --chown=node:node --from=deps /usr/src/app/next.config.js ./
COPY --chown=node:node --from=deps /usr/src/app/server.js ./
COPY --chown=node:node --from=deps /usr/src/app/package.json ./
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=deps /usr/src/app/.next ./.next
ENV NODE_ENV ${NODE_ENV}
USER node
# reference https://github.com/pelias/placeholder/pull/129
CMD ["node", "./server.js"]

FROM release AS dev

USER root
RUN apk --no-cache add git
USER node