#!/bin/bash

# Start MeiliSearch as a Docker container in detached mode
docker run -d --name meilisearch -p 7700:7700 getmeili/meilisearch:v1.2

# Wait for MeiliSearch to be ready
echo "Waiting for MeiliSearch to start..."
until curl -s http://localhost:7700/health | grep '"status":"available"'; do
  sleep 1
  echo -n "."
done
echo "MeiliSearch is up and running."

# Start FastAPI backend in the background
echo "Starting FastAPI backend..."
uvicorn backend.main:app --host 0.0.0.0 --port 8000 &

# Start Next.js frontend
echo "Starting Next.js frontend..."
npm run dev --prefix frontend
