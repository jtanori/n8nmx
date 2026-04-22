FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
# Optimización: sin auditoría ni fund, y en modo silencioso
RUN npm ci --no-audit --no-fund --quiet
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
EXPOSE 3000
CMD ["sh", "-c", "npm start -- -p ${PORT:-3000}"]
