#!/bin/sh
set -e
# Force terminate any previous running instance of winbet-smart-pc
killall -9 winbet-smart-pc 2>/dev/null || true
exit 0
