import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class TestListItem {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    match: PropTypes.string.isRequired
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    const { index, highlightIndex, match } = this.props;

    const classes = classNames({
      'selected': highlightIndex === index
    });

    return (
      <li className={classes} onClick={::this.handleClick}>
        {match}
      </li>
    );
  }
}
