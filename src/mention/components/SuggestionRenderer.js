import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { select } from '../actions/mentionActions';
import DefaultList from '../components/DefaultList.js';

export class SuggestionRenderer extends React.Component {

  static propTypes = {
    highlightIndex: PropTypes.number.isRequired,
    matchedSources: PropTypes.array.isRequired,
    customListRenderer: PropTypes.func
  }

  _renderCustomComponents() {
    const {
      customListRenderer,
      fetching,
      highlightIndex,
      matchedSources,
      dispatch
    } = this.props;

    const onClick = (index) => dispatch(select(index));

    return customListRenderer({
      fetching,
      highlightIndex,
      matchedSources,
      clickFn: onClick
    });
  }

  render() {
    const { customListRenderer } = this.props;

    return (
      customListRenderer instanceof Function
        ? this._renderCustomComponents()
        : <DefaultList />
    );
  }
}

export default connect(state => ({
  fetching: state.mention.fetching,
  highlightIndex: state.mention.highlightIndex,
  matchedSources: state.mention.matchedSources
}))(SuggestionRenderer);
