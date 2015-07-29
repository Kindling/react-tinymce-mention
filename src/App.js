import React from 'react';
import { Provider } from 'redux/react';
import { initializeMentions } from 'mention/plugin';
import initializeRedux from 'mention/utils/initializeRedux';
import renderComponent from 'mention/utils/renderComponent';
import mentionReducer from 'mention/reducers/mentionReducer';
import Mentions from 'mention/Mentions';
import UserItem from 'mention/components/UserItem';

const redux = initializeRedux({
  mention: mentionReducer
});

initializeMentions(redux).then(function(editor) {
  redux.subscribe(function() {
    editor.focus();
    editor.execCommand('mceInsertContent', false, renderComponent(<UserItem />));
  });
});

export default class App {
  render() {
    return (
      <Provider redux={redux} >{() =>
        <Mentions />
      }</Provider>
    );
  }
}
