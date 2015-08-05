// import _ from 'lodash-node';
import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  mentions: state.mention.mentions
}))
export default class TempMentions {
  render() {
    const { mentions } = this.props;

    return (
      <div>
        <h2>Current Mentions</h2>
        <ul>
          { mentions && mentions.map(mention =>
            <li>
              {mention}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
