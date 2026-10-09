# Production Dockerfile for OmniFetch Video Downloader
# Includes Node.js 20 + Python 3 + ffmpeg + yt-dlp

FROM node:20-alpine

# Install Python, FFmpeg, and build essentials
RUN apk add --no-cache python3 py3-pip ffmpeg curl bash

# Install latest yt-dlp directly
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# Install project dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code and build client
COPY . .
RUN npm run build

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start production server
CMD ["node", "server.js"]
