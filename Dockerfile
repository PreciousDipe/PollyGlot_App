# Use Node.js 22 Alpine as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /PollyGlot_App

# Copy only package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]