## Build
FROM node:18-alpine AS build
WORKDIR /build
COPY package.json ./
COPY .npmrc ./
COPY . .
RUN npm install pnpm -g
RUN pnpm i
RUN pnpm build

## Serve
FROM node:18-alpine AS app
WORKDIR /app
COPY --from=build /build/.output .

EXPOSE 3000
ENTRYPOINT ["node", "./server/index.mjs"]