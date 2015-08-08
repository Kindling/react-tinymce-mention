import React, { PropTypes } from 'react';
import TestListItem from 'mention/components/__test__/TestListItem';

export default class TestList {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    highlightIndex: PropTypes.number.isRequired,
    matchedSources: PropTypes.array.isRequired,
  }

  render() {
    const { onClick, highlightIndex, matchedSources } = this.props;

    return (
      <ul id='list' ref='list'>
        { matchedSources && matchedSources.map((match, index) => {
          return (
            <TestListItem
              onClick={onClick}
              highlightIndex={highlightIndex}
              index={index}
              match={match}
              key={`match-${index}`}
            />
          );
        })}
      </ul>
    );
  }
}
