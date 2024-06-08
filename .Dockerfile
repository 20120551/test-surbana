# build phase
FROM node:20-alpine as build
WORKDIR /build
COPY *.json .
RUN npm install
RUN npm install -g typescript
COPY . .
RUN npm run build

# run phase
FROM node:20-alpine
WORKDIR /app
COPY --from=build /build/dist ./dist
CMD [ "npm", "start" ]

