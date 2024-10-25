FROM oven/bun:latest
RUN apt update -y
RUN apt install ffmpeg -y
WORKDIR /app
COPY bun.lockb .
COPY package*.json .
RUN bun install
COPY . .
CMD [ "bun" ,"start" ]
