import initializeRedux from '../../utils/initializeRedux';
import mentionReducer from '../mentionReducer';

describe('mentionReducer', function() {

  var store;

  beforeEach(function() {
    store = initializeRedux({
      mention: mentionReducer
    });
  });

  it('Should work', function() {
    console.log(store.getState())
    expect(true).toBe(true);
  });
});
