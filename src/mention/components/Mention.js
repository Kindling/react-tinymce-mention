import _ from 'lodash-node';
import React, { PropTypes } from 'react';

export default class Mention {

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
      <strong className={`mention-${uid}`} style={{background: '#ccc'}}>
        <a href='foo'>
          @{mention}
        </a>
      </strong>
    );
  }
}
