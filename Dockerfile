FROM node:latest
WORKDIR /project
COPY . .
RUN npm install --force
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "npm", "start"]