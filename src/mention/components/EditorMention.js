import React, { PropTypes } from 'react';

export default class EditorMention {

  static propTypes = {
    tinymceId: PropTypes.string.isRequired,
    displayLabel: PropTypes.string.isRequired
  }

  render() {
    const { delimiter, displayLabel, tinymceId } = this.props;

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
