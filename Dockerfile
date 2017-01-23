FROM node:onbuild
VOLUME ["/usr/src/app"]
WORKDIR /usr/src/app
RUN npm install --silent
EXPOSE 8081
CMD [ "npm", "start" ]