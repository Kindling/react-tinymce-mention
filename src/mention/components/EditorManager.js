import _ from 'lodash-node';
import { PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  editor: state.mention.editor,
  selectedUser: state.mention.selectedUser
}))
export default class EditorManager {

  static propTypes = {
    editor: PropTypes.object
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.editor, this.props.editor)
      || nextProps.selectedUser !== this.props.selectedUser;
  }

  componentDidUpdate() {
    const { editor, selectedUser } = this.props;

    if (editor && selectedUser) {
      editor.execCommand('mceInsertContent', false, `<bold>${selectedUser}</bold>`);
    }
  }

  render() {
    return null;
  }
}
