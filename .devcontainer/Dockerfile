FROM mcr.microsoft.com/vscode/devcontainers/python:3.11

# Install Python venv
RUN apt-get update && \
    apt-get install -y python3.11-venv && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js via feature
# Node.js is handled via the "node" feature in devcontainer.json

# Set up backend virtual environment
RUN python3.11 -m venv /workspace/backend/venv

# Activate virtual environment and install Python dependencies
COPY backend/requirements.txt /workspace/backend/requirements.txt
RUN /workspace/backend/venv/bin/pip install --upgrade pip && \
    /workspace/backend/venv/bin/pip install -r /workspace/backend/requirements.txt

# Install frontend dependencies
COPY frontend/package.json /workspace/frontend/package.json
RUN npm install --prefix /workspace/frontend
