# This stage installs our modules
FROM mhart/alpine-node:14 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY server/package.json ./server/package.json
COPY render/package.json ./render/package.json
RUN yarn --frozen-lockfile

FROM mhart/alpine-node:14 AS serverdeps
WORKDIR /app
COPY package.json yarn.lock ./
COPY server/package.json ./server/package.json
COPY render/package.json ./render/package.json
RUN NODE_ENV=production yarn --frozen-lockfile

FROM deps AS builder
COPY . .
RUN yarn build

FROM serverdeps AS runner
COPY --from=builder /app/render/.next ./render/.next
COPY --from=builder /app/render/public ./render/public
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/.production.env ./server/

ENV NODE_ENV=production
ENV BASE_PATH=/next-nest
CMD ["npm","run","start"]