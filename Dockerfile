FROM node:20.10-alpine

WORKDIR /app

#ARG NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY ./routes routes/
COPY ./views views/
COPY ./public public/
COPY ./middleware middleware/
COPY ./db db/
COPY ./classes classes/
COPY ./server.js ./

CMD [ "npm", "run", "server" ]