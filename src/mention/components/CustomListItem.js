import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class CustomListItem {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    displayLabel: PropTypes.string.isRequired
  }

  handleClick() {
    const { index, onClick } = this.props;
    onClick(index);
  }

  render() {
    const { index, highlightIndex, displayLabel } = this.props;

    const classes = classNames({
      'selected': highlightIndex === index,
      'tinymce-mention': true
    });

    return (
      <li className={classes} onClick={::this.handleClick}>
        {displayLabel}
      </li>
    );
  }
}
