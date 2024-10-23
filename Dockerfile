# Use an official Node.js 20.18.0 Alpine image as a parent image
FROM node:20.18.0-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Start a new stage for the final image
FROM node:20.18.0-alpine

# Set the working directory in the final image
WORKDIR /app

# Copy only the node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of the application files to the final container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
