import 'string.prototype.includes';
import Mention from './mention/Mention';

try {
  if (__PLUGIN_DEV__) {
    require('./mention/test-page');
  }
} catch (error) {}

export default Mention;
