# This stage installs our modules
FROM mhart/alpine-node:14 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:14 AS serverdeps
WORKDIR /app
COPY package.json yarn.lock ./
RUN NODE_ENV=production yarn --frozen-lockfile

FROM deps AS builder
COPY . .
RUN yarn build

FROM serverdeps AS runner
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.production.env .

ENV NODE_ENV=production
ENV BASE_PATH=/next-nest
CMD ["node","dist/src/main"]