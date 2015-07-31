import initializeRedux from 'mention/utils/initializeRedux';
import mentionReducer from 'mention/reducers/mentionReducer';

// import {
//   moveDown,
//   moveUp,
//   query,
//   resetQuery,
//   select,
//   setEditor
// } from 'mention/actions/mentionActions';

describe('mentionReducer', () => {

  var store;

  beforeEach(() => {
    store = initializeRedux({
      mention: mentionReducer
    });
  });

  it('should move the highlighter down', () => {

  });

  it('should move the highlighter up', () => {

  });

  it('should update the current lookup query', () => {

  });

  it('should reset the lookup query', () => {

  });

  it('should select the currently selected item', () => {

  });

  it('set the editor', () => {

  });

});
