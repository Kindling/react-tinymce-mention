#!/bin/sh
if [ ! "$CODECLIMATE_REPO_TOKEN" = "" ]; then
  LCOV=`find coverage/ -name lcov.info`
  node_modules/.bin/codeclimate-test-reporter < $LCOV;
else
  echo "no \$CODECLIMATE_REPO_TOKEN set, skipping report...";
fi