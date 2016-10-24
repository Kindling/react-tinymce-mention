import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MentionListItem from './CustomListItem';

export default class MentionList extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    highlightIndex: PropTypes.number.isRequired,
    matchedSources: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  componentDidUpdate() {
    const { highlightIndex, matchedSources } = this.props;

    if (matchedSources.length) {
      const listNode = ReactDOM.findDOMNode(this.refs.mentionList);
      const focusedListItemNode = ReactDOM.findDOMNode(this.refs['listItem' + highlightIndex]);
      const listRect = listNode.getBoundingClientRect();
      const focusedRect = focusedListItemNode.getBoundingClientRect();

      if (focusedRect.bottom > listRect.bottom || focusedRect.top < listRect.top) {
        listNode.scrollTop = focusedListItemNode.offsetTop
          + focusedListItemNode.clientHeight
          - listNode.offsetHeight;
      }
    }
  }

  render() {
    const {
      fetching,
      highlightIndex,
      matchedSources,
      onClick
    } = this.props;

    return (
      <div>
        <ul className='tinymce-mention__list' ref='mentionList'>
          { matchedSources.length
            ? matchedSources.map((source, index) => {
                const { displayLabel, id } = source;
                return (
                  <MentionListItem
                    onClick={onClick}
                    highlightIndex={highlightIndex}
                    id={id}
                    index={index}
                    displayLabel={displayLabel}
                    key={`match-${index}`}
                    ref={`listItem${index}`}
                  />
                );
              })
            : fetching &&
              <li className='tinymce-mention__item--loading'>
                <strong>
                  loading
                </strong>
              </li>
          }
        </ul>
      </div>
    );
  }
}
