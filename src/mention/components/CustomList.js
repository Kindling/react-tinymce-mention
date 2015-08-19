import React, { PropTypes } from 'react';
import CustomListItem from './CustomListItem';

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
        { matchedSources && matchedSources.map((source, index) => {
          const { displayLabel } = source;

          return (
            <CustomListItem
              displayLabel={displayLabel}
              index={index}
              highlightIndex={highlightIndex}
              onClick={onClick}
              key={`item-${index}`}
            />
          );
        })}
      </ul>
    );
  }
}
