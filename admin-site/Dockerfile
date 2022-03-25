FROM node:lts-alpine
WORKDIR /var/www/saso
COPY admin-site/package*.json ./
RUN npm install
COPY admin-site ./
RUN ls -l
CMD [ "npm", "start" ]