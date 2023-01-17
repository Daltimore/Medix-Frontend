FROM node:18-alpine AS base

RUN npm i -g pnpm
##

FROM base AS dependencies

ARG root="/usr/apps/backend"
RUN mkdir -p ${root}
WORKDIR ${root}

COPY . ${root}/
RUN npm i -g typescript
RUN pnpm --filter @medix/types i
RUN pnpm --filter @medix/types build
RUN pnpm install
# WORKDIR ${root}/apps/medix-backend
##

FROM base AS build

ARG root="/usr/apps/backend"
WORKDIR ${root}/apps/medix-backend
# COPY . .
COPY --from=dependencies "${root}" ./
RUN pnpm --filter @medix/backend build
##

FROM base AS deploy

ARG root="/usr/apps/backend"
WORKDIR ${root}
COPY --from=build "${root}/apps/medix-backend" ./
# COPY --from=build "${root}/apps/medix-backend/node_modules" ./node_modules

CMD [ "node", "apps/medix-backend/dist/app.js" ]
##