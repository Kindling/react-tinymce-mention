import isEqual from 'lodash.isequal';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DefaultListItem from './DefaultListItem.js';

@connect(state => ({
  matchedSources: state.mention.matchedSources
}))
export default class DefaultList {

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
        { matchedSources && matchedSources.length ?
          <ul className='tinymce-mention__list'>
            { matchedSources.map((match, index) => {
              const { displayLabel } = match;

              return (
                <DefaultListItem
                  displayLabel={displayLabel}
                  index={index}
                  key={`match-${index}`}
                />
              );
            })}
          </ul> : null
        }
      </div>
    );
  }
}
