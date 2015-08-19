import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { select } from '../actions/mentionActions';

@connect(state => ({
  highlightIndex: state.mention.highlightIndex
}))
export default class DefaultListItem {

  static propTypes = {
    highlightIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    displayLabel: PropTypes.string.isRequired
  }

  handleClick() {
    const { dispatch, index } = this.props;

    dispatch(select(index));
  }

  render() {
    const { index, highlightIndex, displayLabel } = this.props;

    const classes = classNames({
      'tinymce-mention__item--selected': highlightIndex === index,
      'tinymce-mention__item': true
    });

    return (
      <li className={classes} onClick={::this.handleClick}>
        {displayLabel}
      </li>
    );
  }
}
