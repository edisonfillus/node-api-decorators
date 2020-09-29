FROM node:12-stretch-slim
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --production
RUN npm install pm2 -g
COPY ./dist .
EXPOSE 3000
CMD ["pm2-runtime", "app.js"]