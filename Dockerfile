FROM node:20.18.0

WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to the container
COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]  # Changed this line to run the start script
