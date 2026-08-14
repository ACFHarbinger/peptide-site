# Placeholder multi-stage build for an optional orders/inventory/checkout API backend.
# This repository ships no backend source code yet — replace `backend/` with your
# actual service (e.g. a Node/Express, Fastify, or NestJS API) before
# building this image. Delete infra/docker/ entirely if no backend service is needed.

FROM node:20-alpine AS build
WORKDIR /src
# COPY backend/package*.json ./
# RUN npm ci
# COPY backend/ ./
# RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
# COPY --from=build /src/dist /app/dist
# COPY --from=build /src/node_modules /app/node_modules
EXPOSE 8080
COPY infra/docker/entrypoint.sh /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
# CMD ["node", "dist/index.js"]

