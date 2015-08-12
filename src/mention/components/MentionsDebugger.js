import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  dataSource: state.mention.dataSource,
  mentions: state.mention.mentions
}))
export default class MentionsDebugger {
  render() {
    const { mentions, dataSource } = this.props;

    return (
      <div>
        <h2>Current Mentions</h2>
        <ul>
          { mentions && mentions.map((mention, index) =>
            <li key={`mention-${index}`}>
              {mention.label}
            </li>
          )}
        </ul>

        <div>
          <h2>
            Available users
          </h2>
          <ul>
            { dataSource instanceof Array && dataSource.map((source, index) => {
              return (
                <li key={`source-${index}`}>
                  {source}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
