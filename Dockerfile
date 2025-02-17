FROM node:latest
WORKDIR /project
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8007
ENTRYPOINT [ "npm", "start"]