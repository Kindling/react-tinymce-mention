import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class CustomListItem extends React.Component {

  static propTypes = {
    displayLabel: PropTypes.string.isRequired,
    highlightIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handleClick(event) {
    event.stopPropagation();
    const { index, onClick } = this.props;
    onClick(index);
  }

  render() {
    const { index, highlightIndex, displayLabel } = this.props;

    const classes = classNames({
      'tinymce-mention__item--selected': highlightIndex === index,
      'tinymce-mention__item': true
    });

    return (
      <li className={classes} onMouseDown={::this.handleClick} onTouchStart={::this.handleClick}>
        {displayLabel}
      </li>
    );
  }
}
