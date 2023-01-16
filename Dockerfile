FROM node:18-alpine AS base

ARG root="/usr/apps/backend"
RUN mkdir -p ${root}
WORKDIR ${root}

COPY apps/medix-backend/package.json .
RUN npm install --production
COPY apps/medix-backend/dist/. ./

CMD [ "node", "app.js" ]