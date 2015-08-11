#!/bin/sh -e

./node_modules/.bin/webpack --config webpack.config.js
./node_modules/.bin/webpack --config webpack.dist.js
