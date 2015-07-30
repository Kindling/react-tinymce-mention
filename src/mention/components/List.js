import _ from 'lodash-node';
import React from 'react';
import { connect } from 'react-redux';
import key from 'keymaster';
import ListItem from 'mention/components/ListItem.js';
import { moveDown, moveUp, selectItem } from 'mention/actions/mentionActions';

@connect(state => ({
  highlightIndex: state.mention.highlightIndex,
  users: state.mention.users
}))
export default class List {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.users, this.props.users);
  }

  componentDidMount() {
    this.dispatch = this.props.dispatch;

    this.setupKeyHandlers();
  }

  componentWillUnmount() {
    key.unbind('down');
    key.unbind('up');
    key.unbind('enter');
  }

  setupKeyHandlers() {
    key('down', ::this.handleDownKey);
    key('up', ::this.handleUpKey);
    key('enter', ::this.handleEnterKey);
  }

  handleDownKey() {
    this.dispatch(moveDown());
  }

  handleUpKey() {
    this.dispatch(moveUp());
  }

  handleEnterKey() {
    this.dispatch(selectItem());
  }

  render() {
    const { highlightIndex, users } = this.props;

    console.log(highlightIndex);

    return (
      <ul>
        { users.map((user, index) => {
          return (
            <ListItem
              user={user}
              index={index}
              key={`user-${index}`}
            />
          );
        })}
      </ul>
    );
  }
}
