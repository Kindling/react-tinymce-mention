import isEqual from 'lodash.isequal';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DefaultListItem from './DefaultListItem.js';

@connect(state => ({
  highlightIndex: state.mention.highlightIndex,
  matchedSources: state.mention.matchedSources
}))
export default class DefaultList {

  static propTypes = {
    matchedSources: PropTypes.array.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.matchedSources, this.props.matchedSources)
                 || nextProps.highlightIndex !== this.props.highlightIndex;
  }

  componentDidUpdate() {
    const { highlightIndex, matchedSources } = this.props;

    if (matchedSources.length) {
      const listNode = React.findDOMNode(this.refs.mentionList);
      const focusedListItemNode = React.findDOMNode(this.refs['listItem' + highlightIndex]);
      const listRect = listNode.getBoundingClientRect();
      const focusedRect = focusedListItemNode.getBoundingClientRect();

      if (focusedRect.bottom > listRect.bottom || focusedRect.top < listRect.top) {
        listNode.scrollTop = (focusedListItemNode.offsetTop + focusedListItemNode.clientHeight - listNode.offsetHeight);
      }
    }
  }

  render() {
    const { matchedSources } = this.props;

    return (
      <div>
        { matchedSources && matchedSources.length ?
          <ul className='tinymce-mention__list' ref='mentionList'>
            { matchedSources.map((match, index) => {
              const { displayLabel } = match;

              return (
                <DefaultListItem
                  ref={`listItem${index}`}
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
