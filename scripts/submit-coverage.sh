LCOV=`find coverage/ -name lcov.info`
node_modules/.bin/codeclimate-test-reporter < $LCOV;