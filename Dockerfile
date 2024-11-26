FROM node:18.16.0-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY tsconfig.json tsconfig.build.json nest-cli.json /app/
COPY tickets_dataset.csv /app/

COPY src/ /app/src/

RUN npm run build
