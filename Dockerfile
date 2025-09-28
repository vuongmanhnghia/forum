## syntax=docker/dockerfile:1.6
ARG TARGETPLATFORM
ARG BUILDPLATFORM

FROM --platform=$BUILDPLATFORM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies for better caching
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - Using distroless for minimal size and security
FROM --platform=$TARGETPLATFORM gcr.io/distroless/nodejs20-debian12:nonroot AS production

# Set working directory
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production


CMD ["server.js"]
