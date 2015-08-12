import React, { PropTypes } from 'react';

export default class EditorMention {

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }

  render() {
    const { id, label } = this.props;

    return (
      <strong id={id} className='tinymce-mention'>
        @{label}
      </strong>
    );
  }
}
