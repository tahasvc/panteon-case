FROM node:alpine

WORKDIR /usr/src/client

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]