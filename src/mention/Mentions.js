import _ from 'lodash-node';
import React from 'react';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import renderComponent from 'mention/utils/renderComponent';
import UserItem from 'mention/components/UserItem';

@connect(state => {
  return {
    editor: state.mention.editor,
    users: state.mention.users
  };
})
export default class Mentions {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.users, this.props.users);
  }

  componentDidUpdate() {
    const { editor } = this.props;
    console.log(this.props);

    if (editor) {
      // editor.focus();
      editor.execCommand('mceInsertContent', false, renderComponent(<UserItem />));
    }
  }

  handleEditorChange(event) {
    // console.log(event.target.getContent());
  }

  render() {
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
