import React, { PropTypes } from 'react';

export default class CustomRTEMention {

  static propTypes = {
    displayLabel: PropTypes.string.isRequired,
    delimiter: PropTypes.string.isRequired,
    tinymceId: PropTypes.string.isRequired,
    id: PropTypes.number
  }

  render() {
    const { tinymceId, delimiter, displayLabel } = this.props;
    return (
      <span>
        <a href='#' id={tinymceId} className='tinymce-mention'>
          {delimiter}{displayLabel}
        </a>
        &nbsp;
      </span>
    );
  }
}
