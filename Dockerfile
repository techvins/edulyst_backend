FROM node:20.18.0

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 3000

# Define the command to start the app (adjust the start script if needed)
CMD ["node", "app.js"]
