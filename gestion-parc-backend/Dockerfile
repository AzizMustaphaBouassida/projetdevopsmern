# Use the Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your backend uses
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
