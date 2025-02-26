FROM node:18

RUN 

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .  

EXPOSE 3002

CMD ["node", "dist/app.js"]  