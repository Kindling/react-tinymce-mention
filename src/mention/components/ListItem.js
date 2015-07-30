import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

@connect(state => ({
  highlightIndex: state.mention.highlightIndex
}))
export default class ListItem {

  static propTypes = {
    index: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired
  }

  render() {
    const { index, highlightIndex, user } = this.props;

    const classes = classNames({
      'selected': highlightIndex === index
    });

    return (
      <li className={classes}>
        {user}
      </li>
    );
  }
}
