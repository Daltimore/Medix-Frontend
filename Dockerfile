FROM node:18-alpine AS base
##

FROM base AS dependencies

ARG root="/usr/apps/backend"
RUN mkdir -p ${root}
WORKDIR ${root}

COPY package.json ${root}
RUN npm install --production
COPY . ${root}/
##

CMD [ "node", "app.js" ]
##