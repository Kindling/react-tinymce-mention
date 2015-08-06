import _ from 'lodash-node';
import React, { PropTypes } from 'react';

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
    const uid = _.uniqueId('mention-');

    return (
      <strong className={`mention`}>
        @{mention}
      </strong>
    );
  }
}
