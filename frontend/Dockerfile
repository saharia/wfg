# Use node LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the project
# RUN npm run build

# Expose port
EXPOSE 5173

# Run the Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
