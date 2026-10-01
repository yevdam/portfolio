#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

host_args=()

usage() {
  cat <<'EOF'
Usage: ./demo.sh [--lan]

Options:
  --lan     Make the site accessible to other devices on your local network.
  -h, --help
            Show this help message.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --lan)
      host_args=(--host 0.0.0.0)
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
  shift
done

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js is required. Install it from https://nodejs.org and try again."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Setting up the portfolio for the first time..."
  npm install
fi

if [ "${#host_args[@]}" -gt 0 ]; then
  echo "Starting your portfolio on your local network. Press Ctrl+C when you are finished."
else
  echo "Starting your portfolio. Press Ctrl+C when you are finished."
fi

npm run dev -- --open "${host_args[@]}"
