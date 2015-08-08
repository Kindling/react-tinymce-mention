import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { select } from 'mention/actions/mentionActions';

@connect(state => ({
  highlightIndex: state.mention.highlightIndex
}))
export default class DefaultListItem {

  static propTypes = {
    highlightIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    match: PropTypes.string.isRequired
  }

  handleClick() {
    this.props.dispatch(select());
  }

  render() {
    const { index, highlightIndex, match } = this.props;

    const classes = classNames({
      'selected': highlightIndex === index,
      'mention-list-item': true
    });

    return (
      <li className={classes} onClick={::this.handleClick}>
        {match}
      </li>
    );
  }
}
