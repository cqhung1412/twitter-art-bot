FROM node:16-alpine

ADD . ./

RUN npm install
# RUN npm test

CMD ["npm", "start"]