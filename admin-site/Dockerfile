FROM node:lts-alpine
WORKDIR /var/www/saso-admin
COPY admin-site/package*.json ./
RUN ls -l
RUN npm install
COPY admin-site ./
RUN ls -l
WORKDIR /var/www/saso-admin
CMD [ "npm", "start" ]