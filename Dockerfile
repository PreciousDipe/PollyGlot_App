# Start from the Node.js 22 image on Docker hub
FROM node:22-alpine

#s Specify the Working directory inside the node container that all the commands will run
WORKDIR /PollyGlot_App

# Copy the package files into the image
COPY package*.json ./

# Install the copied dependencies in package.json file into the image
RUN npm install

# Copy all the other files into the image
COPY . .

# Start the container to run the image
CMD ["npm", "start"]

