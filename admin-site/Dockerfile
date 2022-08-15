FROM node:lts-alpine
WORKDIR /var/www/saso
COPY admin-site/package*.json ./
RUN npm install --legacy-peer-deps
COPY admin-site ./
RUN ls -l
RUN npm run build
CMD [ "npm", "start" ]