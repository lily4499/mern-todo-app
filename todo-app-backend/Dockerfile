# Use Node.js LTS as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
