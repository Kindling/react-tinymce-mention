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
        <h2><strong>Current Mentions</strong></h2>
        <ul>
          { mentions.map((mention, index) => {
            console.log(mention, mention.displayLabel);
            return (
              <li key={`mention-${index}`}>
                {mention.displayLabel}
              </li>
            );
          })}
        </ul>

        <div>
          <h2>
            <strong>
              Available users
            </strong>
          </h2>
          <ul>
            { dataSource.map((source, index) => {
              return (
                <li key={`source-${index}`}>
                  {source.displayLabel}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
