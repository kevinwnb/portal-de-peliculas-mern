FROM node:18

WORKDIR /mynodeapp1

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]