FROM node:latest
WORKDIR /project
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "npm", "start"]