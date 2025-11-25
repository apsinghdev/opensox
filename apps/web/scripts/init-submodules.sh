#!/bin/bash
set -e

if [ -n "$GITHUB_TOKEN" ]; then
  echo "Using HTTPS with GitHub token"
  
  # Verify token is not empty after trimming
  if [ -z "${GITHUB_TOKEN// }" ]; then
    echo "Error: GITHUB_TOKEN is set but empty"
    exit 1
  fi

  # Overwrite the submodule URL with token-authenticated URL
  git submodule set-url apps/web/src/content/newsletters-premium \
    https://$GITHUB_TOKEN:@github.com/apsinghdev/opensox-newsletters-premium.git

elif [ -n "$GIT_SSH_KEY" ]; then
  echo "Using SSH key authentication"
  
  if [ -z "${GIT_SSH_KEY// }" ]; then
    echo "Error: GIT_SSH_KEY is set but empty"
    exit 1
  fi
  
  if ! echo "$GIT_SSH_KEY" | grep -qE "^(ssh-ed25519|ssh-rsa|ecdsa-sha2-nistp256|ecdsa-sha2-nistp384|ecdsa-sha2-nistp521|-----BEGIN)"; then
    echo "Error: GIT_SSH_KEY does not appear to be a valid SSH key"
    exit 1
  fi
  
  mkdir -p ~/.ssh
  printf '%s' "$GIT_SSH_KEY" > ~/.ssh/id_ed25519
  chmod 600 ~/.ssh/id_ed25519
  ssh-keyscan github.com >> ~/.ssh/known_hosts
  
else
  echo "No authentication found! Skipping premium submodule initialization."
  echo "Note: Public newsletters will still work. Premium newsletters require authentication."
  exit 0
fi

if git submodule update --init --recursive --force; then
  echo "Submodules initialized successfully"
else
  echo "Warning: Submodule initialization failed, but continuing build..."
  echo "Note: Public newsletters will still work. Premium newsletters require authentication."
  exit 0
fi
