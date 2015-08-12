#!/bin/sh -e

webpack=node_modules/.bin/webpack

git checkout gh-pages
git merge master
$webpack --config webpack.config.js
git add --all .
git commit -m "New release"
git push origin gh-pages
git checkout master
