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
CMD [ "node", "dist/main.js" ]

