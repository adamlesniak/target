FROM node:26-alpine3.24 AS base

FROM base AS builder

WORKDIR /home/node/app

COPY package*.json ./
COPY . .

# Make use of build args
RUN npm install --config.confirmModulesPurge=false --ignore-scripts
RUN npm build

FROM base AS runtime

ENV NODE_ENV=production

WORKDIR /home/node/app
COPY package*.json  ./
COPY package-lock.yaml ./

RUN npm install --prod --config.confirmModulesPurge=false --ignore-scripts

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/src ./src

EXPOSE $PORT

CMD ["node", "dist/app.js"]