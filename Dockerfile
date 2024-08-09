FROM node:12.22.9

WORKDIR /PollyGlot_App

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

