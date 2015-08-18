import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default class CustomListItem {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    displayLabel: PropTypes.string.isRequired
  }

  handleClick() {
    this.props.onClick()
  }

  render() {
    const { index, highlightIndex, displayLabel } = this.props

    const classes = classNames({
      'selected': highlightIndex === index
    })

    return (
      <li className={classes} onClick={::this.handleClick}>
        {displayLabel}
      </li>
    )
  }
}
