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
    this.props.dispatch(select());
  }

  render() {
    const { index, highlightIndex, displayLabel } = this.props;

    const classes = classNames({
      'selected': highlightIndex === index,
      'tinymce-mention__item': true
    });

    return (
      <li className={classes} onClick={::this.handleClick}>
        {displayLabel}
      </li>
    );
  }
}
