import React from 'react';
import { provide } from 'react-redux';
import { initializeMentions } from 'mention/plugin';
import { setEditor } from 'mention/actions/mentionActions';
import initializeRedux from 'mention/utils/initializeRedux';
import mentionReducer from 'mention/reducers/mentionReducer';
import Mentions from 'mention/Mentions';

const store = initializeRedux({
  mention: mentionReducer
});

@provide(store)
export default class Users {
  componentDidMount() {
    initializeMentions(store).then(function(editor) {
      store.dispatch(setEditor(editor));
    });
  }

  render() {
    return (
      <Mentions />
    );
  }
}
