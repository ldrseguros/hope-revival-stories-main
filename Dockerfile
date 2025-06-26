FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy Prisma schema and migrations
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start"] 