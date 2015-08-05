#!/bin/sh -e

git checkout gh-pages
git merge master
./node_modules/.bin/webpack --config webpack.config.js
git add --all .
git commit -m "New release"
git push origin gh-pages
git checkout master
