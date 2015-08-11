import React, { PropTypes } from 'react';
import CustomListItem from 'mention/components/__test__/CustomListItem';

export default class CustomList {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    highlightIndex: PropTypes.number.isRequired,
    matchedSources: PropTypes.array.isRequired,
  }

  render() {
    const { onClick, highlightIndex, matchedSources } = this.props;

    return (
      <ul>
        { matchedSources && matchedSources.map((match, index) => {
          return (
            <CustomListItem
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
