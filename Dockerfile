# Use an official Node.js image as the base image
FROM node:20.11-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm -v
# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js image for the production build
FROM node:20.11-alpine

WORKDIR /app

# Copy the production build from the build image
COPY --from=build /app/build ./build

# Expose the port on which your React app will run (e.g., 80)
EXPOSE 80

# Start the React app
CMD ["npx", "serve", "-s", "build", "-l", "80"]