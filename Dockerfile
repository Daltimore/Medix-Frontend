FROM node:18-alpine AS base

RUN npm i -g pnpm
##

FROM base AS dependencies

ARG root="/usr/apps/backend"
RUN mkdir -p ${root}
WORKDIR ${root}

COPY . ${root}/
RUN pnpm install
WORKDIR ${root}/apps/medix-backend
RUN pnpm install
##

FROM base AS build

ARG root="/usr/apps/backend"
WORKDIR ${root}/apps/medix-backend
# COPY . .
# COPY --from=dependencies "${root}/node_modules" ./node_modules
RUN pnpm build
RUN pnpm prune --prod
##

FROM base AS deploy

ARG root="/usr/apps/backend"
WORKDIR ${root}
COPY --from=build "${root}/apps/medix-backend/dist" ./dist
COPY --from=build "${root}/apps/medix-backend/node_modules" ./node_modules

CMD [ "node", "dist/app.js" ]
##