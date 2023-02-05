FROM node:18

WORKDIR /mynodeapp1

COPY package*.json ./

RUN npm install

RUN npm install --prefix ./client

COPY . .

CMD ["npm", "start"]