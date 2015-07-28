import React from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import * as mentionActions from 'mentions/actions/mentionActions';

@connect(state => {
  return {
    hello: state.mentions.hello
  };
})
export default class Mentions {
  render() {
    const { hello, dispatch } = this.props;
    const { fetchUsers } = bindActionCreators(mentionActions, dispatch);

    return (
      <div>
        hi! {hello}
      </div>
    );
  }
}
