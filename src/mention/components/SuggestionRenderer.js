import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { select } from '../actions/mentionActions';
import DefaultList from '../components/DefaultList.js';

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

  _renderCustomComponents() {
    const {
      customRenderer,
      highlightIndex,
      matchedSources,
      dispatch
    } = this.props;

    const onClick = (index) => dispatch(select(index));

    return customRenderer({
      highlightIndex,
      matchedSources,
      clickFn: onClick
    });
  }

  render() {
    const { customRenderer } = this.props;

    return (
      customRenderer
        ? this._renderCustomComponents()
        : <DefaultList />
    );
  }
}
