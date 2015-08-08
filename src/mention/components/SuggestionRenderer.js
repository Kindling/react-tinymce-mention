import isEqual from 'lodash.isequal';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { select } from 'mention/actions/mentionActions';
import SuggestionList from 'mention/components/SuggestionList.js';

@connect(state => ({
  editor: state.mention.editor,
  highlightIndex: state.mention.highlightIndex,
  matchedSources: state.mention.matchedSources
}))
export default class SuggestionRenderer {

  static propTypes = {
    highlightIndex: PropTypes.number.isRequired,
    matchedSources: PropTypes.array.isRequired,
    customRenderer: PropTypes.func
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.matchedSources, this.props.matchedSources);
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
    const { customRenderer } = this.props;

    return (
      customRenderer
        ? this._renderCustomComponents()
        : <SuggestionList />
    );
  }
}
