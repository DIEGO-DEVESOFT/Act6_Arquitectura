# Dockerfile for auth-service and gateway
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD ["node", "src/index.js"]
