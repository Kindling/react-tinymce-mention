import isEqual from 'lodash.isequal';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SuggestionListItem from 'mention/components/SuggestionListItem.js';

@connect(state => ({
  matchedSources: state.mention.matchedSources
}))
export default class SuggestionList {

  static propTypes = {
    matchedSources: PropTypes.array.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.matchedSources, this.props.matchedSources);
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
