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
  
  # Determine key type from the key header and use appropriate filename
  if echo "$GIT_SSH_KEY" | grep -q "^ssh-ed25519"; then
    SSH_KEY_FILE="$HOME/.ssh/id_ed25519"
  elif echo "$GIT_SSH_KEY" | grep -q "^ssh-rsa"; then
    SSH_KEY_FILE="$HOME/.ssh/id_rsa"
  elif echo "$GIT_SSH_KEY" | grep -q "^ecdsa-sha2"; then
    SSH_KEY_FILE="$HOME/.ssh/id_ecdsa"
  elif echo "$GIT_SSH_KEY" | grep -q "^-----BEGIN"; then
    # PEM format - could be RSA, ECDSA, or Ed25519, default to RSA
    SSH_KEY_FILE="$HOME/.ssh/id_rsa"
  else
    # Fallback to ed25519 if type cannot be determined
    SSH_KEY_FILE="$HOME/.ssh/id_ed25519"
  fi
  
  mkdir -p ~/.ssh
  printf '%s' "$GIT_SSH_KEY" > "$SSH_KEY_FILE"
  chmod 600 "$SSH_KEY_FILE"
  ssh-keyscan github.com >> ~/.ssh/known_hosts
  
  # Configure SSH to use the specific key file for GitHub
  cat >> ~/.ssh/config <<EOF
Host github.com
  IdentityFile $SSH_KEY_FILE
  IdentitiesOnly yes
EOF
  chmod 600 ~/.ssh/config
  
else
  echo "⚠️  No authentication found! Skipping premium submodule initialization."
  echo "Note: Public newsletters will still work. Premium newsletters require authentication."
  echo "Status: SKIPPED (exit code 0 - build will continue without premium content)"
  exit 0
fi

# Only disable exit-on-error for submodule update to allow graceful failure
set +e
git submodule update --init --recursive --force
submodule_exit_code=$?
set -e

if [ $submodule_exit_code -eq 0 ]; then
  echo "Submodules initialized successfully"
else
  echo "Error: Submodule initialization failed after authentication was provided."
  echo "This may indicate network issues, invalid credentials, or repository problems."
  exit $submodule_exit_code
fi
