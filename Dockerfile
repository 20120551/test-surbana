# build phase
FROM node:20-alpine as build
WORKDIR /build
COPY *.json .
RUN npm install
RUN npm install -g typescript
COPY . .
RUN npx prisma generate
RUN npm run build

# run phase
FROM node:20-alpine
WORKDIR /app
COPY --from=build /build/dist/node /.prisma/client
COPY --from=build /build/dist ./dist
RUN rm -rf dist/node
EXPOSE 3000
ENV DATABASE_URL="postgresql://surbana_owner:NWDomaxF9e1Z@ep-jolly-boat-a56jz0h2.us-east-2.aws.neon.tech/surbana?sslmode=require"
ENV NODE_ENV="prod"
CMD [ "node", "dist/main.js" ]

