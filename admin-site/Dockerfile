FROM node:lts-alpine
WORKDIR /var/www/saso
COPY admin-site/package*.json ./
RUN ls -l
RUN npm install
COPY admin-site ./
RUN ls -l
RUN npm run build
WORKDIR /var/www/saso
CMD [ "npm", "run", "start" ]