import _ from 'lodash-node';
import React from 'react';
import { connect } from 'react-redux';
import SuggestionListItem from 'mention/components/SuggestionListItem.js';
import { moveDown, moveUp, select } from 'mention/actions/mentionActions';

@connect(state => ({
  editor: state.mention.editor,
  highlightIndex: state.mention.highlightIndex,
  matchedSources: state.mention.matchedSources
}))
export default class SuggestionList {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.matchedSources, this.props.matchedSources);
  }

  render() {
    const { matchedSources } = this.props;

    return (
      <div>
        <h2>List popup</h2>
        <ul id='list' ref='list'>
          { matchedSources && matchedSources.map((match, index) => {
            return (
              <SuggestionListItem
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
