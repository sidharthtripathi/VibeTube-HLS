FROM oven/bun:latest
RUN apt-get update
RUN apt-get install ffmpeg -y
WORKDIR /app
COPY bun.lockb .
COPY package*.json .
RUN bun install
COPY . .
CMD [ "bun" ,"start" ]