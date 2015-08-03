import _ from 'lodash-node';
import { PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  editor: state.mention.editor,
  mentions: state.mention.mentions
}))
export default class EditorManager {

  static propTypes = {
    editor: PropTypes.object,
    mentions: PropTypes.array
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.editor, this.props.editor)
      || !_.isEqual(nextProps.mentions, this.props.mentions);
  }

  componentDidUpdate() {
    const { editor, mentions } = this.props;

    if (editor && !_.isEmpty(mentions)) {
      editor.execCommand('mceInsertContent', false, `<bold>${mentions[0]}</bold>`);
    }
  }

  render() {
    return null;
  }
}
