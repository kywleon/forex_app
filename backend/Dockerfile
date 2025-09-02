FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'production' ]; then npm start; else npm run dev; fi"]

