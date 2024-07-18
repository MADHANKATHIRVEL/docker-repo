FROM node:16.20.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all local files to the container (except those specified in .dockerignore)
COPY . .

# Build your application
RUN npm run build

# Expose the port your app runs on
EXPOSE 5000

# Command to run your application
CMD ["npm", "run", "start"]
