import React, { PropTypes } from 'react';
import uid from 'mention/utils/uid';

export default class EditorMention {

  // TODO: Wire up type handlers
  static propTypes = {
    mention: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.element
    ])
  }

  render() {
    const { mention } = this.props;
    const u = uid('mention-');

    return (
      <strong className={`mention`}>
        @{mention}
      </strong>
    );
  }
}
