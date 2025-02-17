FROM node:latest
WORKDIR /project
# Copy package.json and install dependencies
COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
EXPOSE 8007
CMD ["npm","start"]