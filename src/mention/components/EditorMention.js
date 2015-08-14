import React, { PropTypes } from 'react';

export default class EditorMention {

  static propTypes = {
    id: PropTypes.string.isRequired,
    displayLabel: PropTypes.string.isRequired
  }

  render() {
    const { id, displayLabel } = this.props;

    console.log(displayLabel);

    return (
      <strong id={id} className='tinymce-mention'>
        @{displayLabel}
      </strong>
    );
  }
}
