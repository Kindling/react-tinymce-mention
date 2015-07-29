import _ from 'lodash-node';
import React from 'react';
import { connect, provide } from 'react-redux';
import { initializeMentions } from 'mention/plugin';
import initializeRedux from 'mention/utils/initializeRedux';
import renderComponent from 'mention/utils/renderComponent';
import mentionReducer from 'mention/reducers/mentionReducer';
import Mentions from 'mention/Mentions';
import UserItem from 'mention/components/UserItem';

const store = initializeRedux({
  mention: mentionReducer
});

var editor;

initializeMentions(store).then(function(ed) {
  editor = ed;
});

@provide(store)
@connect(state => {
  return {
    users: state.mention.users
  };
})
export default class Users {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.users, this.props.users);
  }

  componentDidUpdate() {
    editor.focus();
    editor.execCommand('mceInsertContent', false, renderComponent(<UserItem />));
  }

  render() {
    return (
      <Mentions />
    );
  }
}
