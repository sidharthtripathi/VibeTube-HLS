FROM node:slim
RUN apt-get update
RUN apt-get install ffmpeg -y
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm" ,"start" ]