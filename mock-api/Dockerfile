# Optional local/Fly image. Production mock is deployed to Cloudflare Workers
# (see .github/workflows/deploy-mock.yml). This package is an npm workspace
# member without its own lockfile, so installs use package.json ranges.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY package.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 4000
CMD ["npm", "run", "start"]
