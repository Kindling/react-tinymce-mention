import isEqual from 'lodash.isequal';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SuggestionListItem from 'mention/components/SuggestionListItem.js';
import { select } from 'mention/actions/mentionActions';

@connect(state => ({
  editor: state.mention.editor,
  highlightIndex: state.mention.highlightIndex,
  matchedSources: state.mention.matchedSources
}))
export default class SuggestionList {

  static propTypes = {
    highlightIndex: PropTypes.number.isRequired,
    matchedSources: PropTypes.array.isRequired,
    customRenderer: PropTypes.func
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.matchedSources, this.props.matchedSources);
  }

  componentDidUpdate() {
    const { customRenderer } = this.props;

    if (customRenderer) {
    }
  }

  _renderCustomComponents() {
    const { customRenderer, highlightIndex, matchedSources } = this.props;

    return customRenderer({
      highlightIndex,
      matchedSources,
      clickFn: select
    })
  }

  render() {
    const { customRenderer, matchedSources } = this.props;

    return (
      customRenderer ? this._renderCustomComponents() :
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
