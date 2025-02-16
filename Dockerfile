# FROM node:latest
# WORKDIR /project
# COPY . .
# RUN npm install --force
# RUN npm run build
# EXPOSE 8007
# ENTRYPOINT [ "npm", "start"]

# ---------------------
# 1) Build Stage
# ---------------------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # Copy only the package files first
    COPY package*.json ./
    RUN npm install --force
    
    # Copy the rest of your code
    COPY . .
    
    # Build the Next.js project
    RUN npm run build
    
    
    # ---------------------
    # 2) Production Stage
    # ---------------------
    FROM node:18-alpine AS runner
    
    WORKDIR /app
    
    # Copy the necessary files from the builder stage
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/public ./public
    
    # (Optional) If you use Tailwind, you might also need postcss.config and tailwind.config:
    # COPY --from=builder /app/postcss.config.mjs ./
    # COPY --from=builder /app/tailwind.config.js ./
    
    # Expose port 8007
    EXPOSE 8007
    
    # Run Next.js in production mode
    CMD ["npm", "start"]
    