FROM node:18-alpine AS base

RUN npm i -g pnpm
##

FROM base AS dependencies

ARG root="/backend"
RUN mkdir -p ${root}
WORKDIR ${root}/

COPY . ${root}/

RUN pnpm --filter @medix/types i
RUN pnpm --filter @medix/types build

RUN pnpm install
##

FROM base AS build

ARG root="/backend"
WORKDIR ${root}

COPY --from=dependencies ${root} ${root}
RUN pnpm --filter @medix/backend build
##

FROM base AS deploy

ARG root="/backend"
WORKDIR ${root}
COPY --from=build ${root} ${root}

CMD [ "node", "apps/medix-backend/dist/index.js" ]
#