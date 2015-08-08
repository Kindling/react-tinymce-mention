import React, { PropTypes } from 'react';
import uid from 'mention/utils/uid';

export default class EditorMention {

  static propTypes = {
    mention: PropTypes.string.isRequired
  }

  render() {
    const { mention } = this.props;
    const uuid = uid('mention-');

    return (
      <strong id={uuid} className='mention'>
        @{mention}
      </strong>
    );
  }
}
