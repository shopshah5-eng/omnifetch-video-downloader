# Production Dockerfile for OmniFetch Video Downloader
# Includes Node.js 20 + Python 3 + FFmpeg + yt-dlp

FROM node:20-alpine

# Install Python 3, FFmpeg, curl, and certificates
RUN apk add --no-cache python3 py3-pip ffmpeg curl bash ca-certificates

# Install latest yt-dlp standalone binary
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# Install all dependencies (including devDependencies needed for Vite build)
COPY package*.json ./
RUN npm ci

# Copy source code and build client + prerender static routes
COPY . .
RUN npm run build

# Remove development dependencies to keep container lightweight
RUN npm prune --production

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start production server
CMD ["node", "server.js"]
