FROM node:latest
WORKDIR /project
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8007
ENTRYPOINT ["next","start","-p","8007"]