import isEqual from 'lodash.isequal';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DefaultListItem from 'mention/components/DefaultListItem.js';

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
        <h2>List popup</h2>
        <ul className='mention-list'>
          { matchedSources && matchedSources.map((match, index) => {
            return (
              <DefaultListItem
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
