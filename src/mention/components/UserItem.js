import React, { PropTypes } from 'react';

export default class UserItem {

  static propTypes = {
    user: PropTypes.string
  }

  render() {
    const { user } = this.props;

    return (
      <bold>
        {user}
      </bold>
    );
  }
}
