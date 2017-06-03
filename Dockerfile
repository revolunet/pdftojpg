FROM jcsousa/nodejs-alpine-graphicsmagick

ENV PORT 1234

RUN apk update && apk add ghostscript

RUN mkdir -p /home/app/src/
WORKDIR /home/app
COPY package.json /home/app/
COPY src/ /home/app/src/
RUN npm install

EXPOSE $PORT
CMD [ "npm", "start" ]
