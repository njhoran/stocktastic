FROM mhart/alpine-node:10

RUN addgroup -S stocktastic && adduser -S -G stocktastic stocktastic

USER stocktastic

WORKDIR /home/stocktastic

COPY package.json .

RUN npm install --production

COPY . .

EXPOSE 3001/tcp

ENV NODE_ENV production

CMD ["npm", "start"]
