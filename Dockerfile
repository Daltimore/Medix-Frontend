FROM node:18-alpine AS base

ARG root="/usr/apps/backend"
RUN mkdir -p ${root}
WORKDIR ${root}

COPY apps/medix-backend/package.json apps/medix-backend/package-lock.json ./
RUN npm ci --omit=dev
COPY apps/medix-backend/dist/. ./

CMD [ "node", "app.js" ]