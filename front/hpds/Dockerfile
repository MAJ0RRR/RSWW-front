# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./front/hpds/package.json ./front/hpds/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY ./front/hpds ./

# Build the application for production
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]