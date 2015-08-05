import _ from 'lodash-node';
import React from 'react';
import { connect } from 'react-redux';
import key from 'keymaster';
import ListItem from 'mention/components/ListItem.js';
import { moveDown, moveUp, select } from 'mention/actions/mentionActions';

@connect(state => ({
  editor: state.mention.editor,
  highlightIndex: state.mention.highlightIndex,
  matchedSources: state.mention.matchedSources
}))
export default class List {

  componentDidMount() {
    this.dispatch = this.props.dispatch;
    this.setupKeyHandlers();
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.matchedSources, this.props.matchedSources);
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
    this.dispatch(select());
  }

  render() {
    const { matchedSources } = this.props;

    return (
      <div>
        <h2>List popup</h2>
        <ul id='list' ref='list'>
          { matchedSources && matchedSources.map((match, index) => {
            return (
              <ListItem
                match={match}
                index={index}
                key={`match-${index}`}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
