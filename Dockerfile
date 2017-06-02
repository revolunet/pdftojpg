FROM mhart/alpine-node

# build tools for native dependencies
RUN apk add --update make gcc g++ python git

# graphicsmagick
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories;
RUN apk add --update graphicsmagick && rm -rf /var/cache/apk/*


ENV PORT 1234
RUN mkdir -p /home/app/src
WORKDIR /home/app
COPY package.json /home/app/
COPY src/ /home/app/src/
RUN npm install

EXPOSE $PORT
CMD [ "npm", "start" ]