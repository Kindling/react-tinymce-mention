import 'string.prototype.includes';
import Promise from 'es6-promise';
import Mention from './mention/Mention';

Promise.polyfill();

try {
  if (__DEV__) {
    require('./mention/test-pages/simple');
    // require('./mention/test-pages/complex');
    // require('./mention/test-pages/promise');
    // require('./mention/test-pages/async');
  }
} catch (error) {}

export default Mention;
