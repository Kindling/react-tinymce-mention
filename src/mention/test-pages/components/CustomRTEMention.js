import React from 'react';

export default class CustomRTEMention {
  render() {
    const { tinymceId, delimiter, displayLabel } = props;
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
