#!/bin/sh -e

babel=node_modules/.bin/babel
webpack=node_modules/.bin/webpack
build_dir=lib

git clean -f $build_dir

$babel ./src -d $build_dir --ignore "__tests__"

$webpack --config webpack.config.js
$webpack --config webpack.dist.js

echo "gzipped, the global build is `gzip -c $build_dir/umd/react-tinymce-mention.min.js | wc -c | sed -e 's/^[[:space:]]*//'` bytes"
