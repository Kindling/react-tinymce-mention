import 'es5-shim';
import 'string.prototype.includes';
import Promise from 'es6-promise';
import Mention from './mention/Mention';

Promise.polyfill();

try {
  if (__PLUGIN_DEV__) {
    require('./mention/test-page');
  }
} catch (error) {}

export default Mention;
