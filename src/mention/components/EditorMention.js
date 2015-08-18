import React, { PropTypes } from 'react';

export default class EditorMention {

  static propTypes = {
    tinymceId: PropTypes.string.isRequired,
    displayLabel: PropTypes.string.isRequired
  }

  render() {
    const { tinymceId, displayLabel } = this.props;

    return (
      <a href='#' id={tinymceId} className='tinymce-mention'>
        @{displayLabel}
      </a>
    );
  }
}
