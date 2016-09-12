import React, { PropTypes } from 'react';

export default class EditorMention extends React.Component {

  static propTypes = {
    tinymceId: PropTypes.string.isRequired,
    displayLabel: PropTypes.string.isRequired
  };

  render() {
    const { delimiter, displayLabel, tinymceId } = this.props;

    return (
      <span>
        <a href='#' id={tinymceId} className='tinymce-mention'>
          {delimiter}{displayLabel}
        </a>
      </span>
    );
  }
}
