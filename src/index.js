import Mention from './mention/Mention'

try {
  if (__DEV__) {
    require('./mention/test-page')
  }
} catch (error) {}

export default Mention
