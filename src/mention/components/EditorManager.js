import _ from 'lodash-node';
import { PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  editor: state.mention.editor
}))
export default class EditorManager {

  static propTypes = {
    editor: PropTypes.object
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.editor, this.props.editor);
  }

  componentDidUpdate() {
    const { editor } = this.props;

    if (editor) {
      editor.execCommand('mceInsertContent', false, '@');
    }
  }

  render() {
    return null;
  }
}
