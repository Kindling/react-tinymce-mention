import React from 'react';
import { Provider } from 'redux/react';
import { initializeMentions } from 'mentions/plugin';
import initializeRedux from 'mentions/utils/initializeRedux';
import renderComponent from 'mentions/utils/renderComponent';
import mentionReducer from 'mentions/reducers/mentionReducer';
import Mentions from 'mentions/Mentions';
import UserItem from 'mentions/components/UserItem';

const redux = initializeRedux({
  mentions: mentionReducer
});

initializeMentions(redux).then(function(editor) {
  redux.subscribe(function() {
    editor.focus();
    editor.execCommand('mceInsertContent', false, renderComponent(<UserItem />));
  });
});

export default class Search {
  render() {
    return (
      <Provider redux={redux} >{() =>
        <Mentions />
      }</Provider>
    );
  }
}
