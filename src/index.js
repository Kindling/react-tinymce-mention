import 'string.prototype.includes';
import Promise from 'es6-promise';
import Mention from './mention/Mention';

Promise.polyfill();

try {
  if (__DEV__) {
    require('./mention/__tests__/test-page');
  }
} catch (error) {}

export default Mention;
