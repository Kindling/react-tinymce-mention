import React from 'react';
import { provide } from 'react-redux';
import { initializePlugin } from 'mention/plugin';
import { setEditor } from 'mention/actions/mentionActions';
import initializeRedux from 'mention/utils/initializeRedux';
import mentionReducer from 'mention/reducers/mentionReducer';
import EditorManager from 'mention/components/EditorManager';
import List from 'mention/components/List';

const store = initializeRedux({
  mention: mentionReducer
});

@provide(store)
export default class Mention {
  componentDidMount() {
    initializePlugin(store).then(editor => {
      store.dispatch(setEditor(editor));
    });
  }

  render() {
    return (
      <div>
        <List />
        <EditorManager />
      </div>
    );
  }
}
