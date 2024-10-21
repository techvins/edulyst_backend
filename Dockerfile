# Use an official Node.js 20.18.0 Alpine image as a parent image
FROM node:20.18.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (only production)
RUN npm ci --only=production

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]  # Changed this line to run the start script
