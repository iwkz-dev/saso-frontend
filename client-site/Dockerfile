FROM node:lts-alpine
WORKDIR /var/www/saso
COPY client-site/package*.json ./
RUN npm install
COPY client-site ./
RUN ls -l
RUN npm run build
CMD [ "npm", "start" ]