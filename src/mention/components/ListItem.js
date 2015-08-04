import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

@connect(state => ({
  highlightIndex: state.mention.highlightIndex
}))
export default class ListItem {

  static propTypes = {
    index: PropTypes.number.isRequired,
    match: PropTypes.string.isRequired
  }

  render() {
    const { index, highlightIndex, match } = this.props;

    const classes = classNames({
      'selected': highlightIndex === index
    });

    return (
      <li className={classes}>
        {match}
      </li>
    );
  }
}
