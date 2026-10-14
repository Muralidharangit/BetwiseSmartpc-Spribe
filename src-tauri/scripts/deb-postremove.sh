#!/bin/sh
set -e
for u in /home/*; do
  rm -rf "$u/.cache/com.winbet.smartpc" 2>/dev/null || true
done
exit 0
