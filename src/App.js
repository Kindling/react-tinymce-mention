import React from 'react';
import { Provider } from 'redux/react';
import initializeRedux from 'mentions/utils/initializeRedux';
import mentionReducer from 'mentions/reducers/mentionReducer';
import Mentions from 'mentions/Mentions';

const redux = initializeRedux({
  mentions: mentionReducer
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
