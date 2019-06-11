ARG NODE_VERSION=12.4.0

### STAGE 1: Building project ###
#-----------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS builder

RUN apk --no-cache add git
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

## Create app directory
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run prestart:prod

## STAGE 2: Setup main image ###
#-----------------------------------------------------
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

# Copy dependency definitions
COPY --from=builder /app/node_modules ./node_modules
ENV PATH node_modules/.bin:$PATH

COPY --from=builder /app/package.json ./package.json

# Copy compiled sources
COPY --from=builder /app/dist ./


#VOLUME ["/app/log"]

# Expose the port the app runs in
EXPOSE 3000

#ENTRYPOINT ["entrypoint-app"]

## Serve the app
CMD ["node", "src/main.js"]
