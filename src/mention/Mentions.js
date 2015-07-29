import React from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import * as mentionActions from 'mention/actions/mentionActions';

@connect(state => {
  return {
    hello: state.mention.hello
  };
})
export default class Mentions {

  handleEditorChange(event) {
    console.log(event.target.getContent());
  }

  render() {
    const { dispatch } = this.props;
    const { fetchUsers } = bindActionCreators(mentionActions, dispatch);

    return (
      <TinyMCE
        content=''
        config={{
          plugins: 'autolink link image lists mention print preview',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',

          mention: {
            source: [
              { name: 'Tyra Porcelli' },
              { name: 'Brigid Reddish' },
              { name: 'Ashely Buckler' },
              { name: 'Teddy Whelan' }
            ]
          }
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}
