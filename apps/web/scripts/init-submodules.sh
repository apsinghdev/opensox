#!/bin/bash
set +e

if [ -n "$GITHUB_TOKEN" ]; then
  echo "Using HTTPS with GitHub token"

  # Overwrite the submodule URL with token-authenticated URL
  git submodule set-url apps/web/src/content/newsletters-premium \
    https://$GITHUB_TOKEN:@github.com/apsinghdev/opensox-newsletters-premium.git

elif [ -n "$GIT_SSH_KEY" ]; then
  echo "Using SSH key authentication"
  mkdir -p ~/.ssh
  printf '%s' "$GIT_SSH_KEY" > ~/.ssh/id_ed25519
  chmod 600 ~/.ssh/id_ed25519
  ssh-keyscan github.com >> ~/.ssh/known_hosts
else
  echo "No authentication found! Skipping premium submodule initialization."
  echo "Note: Public newsletters will still work. Premium newsletters require authentication."
  exit 0
fi

git submodule update --init --recursive --force
if [ $? -eq 0 ]; then
  echo "Submodules initialized successfully"
else
  echo "Warning: Submodule initialization failed, but continuing build..."
  echo "Note: Public newsletters will still work. Premium newsletters require authentication."
  exit 0
fi
