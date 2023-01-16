FROM node:18-alpine AS base
##

FROM base AS dependencies

ARG root="/usr/apps/backend"
RUN mkdir -p ${root}
WORKDIR ${root}

RUN ls
RUN pwd

COPY ./apps/medix-backend/dist/. ${root}/
COPY ./apps/medix-backend/package.json ${root}
RUN npm install --production
##

CMD [ "node", "app.js" ]
##