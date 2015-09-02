import isEqual from 'lodash.isequal';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import diffMentionState from '../utils/diffMentionState';
import last from '../utils/last';
import renderComponent from '../utils/renderComponent';
import EditorMention from '../components/EditorMention';

@connect(state => ({
  editor: state.mention.editor,
  mentions: state.mention.mentions
}))
export default class TinyMCEDelegate extends Component {

  static propTypes = {
    customRTEMention: PropTypes.func,
    editor: PropTypes.object,
    mentions: PropTypes.array,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {
    mentions: []
  }

  state = {
    shouldRender: false
  }

  shouldComponentUpdate(nextProps) {
    const nextEditorId = nextProps.editor && nextProps.editor.id;
    const editorId = this.props.editor && this.props.editor.id;

    return nextEditorId !== editorId
      || !isEqual(nextProps.mentions, this.props.mentions);
  }

  componentWillReceiveProps(nextProps) {
    const { mentions, onAdd, onRemove } = this.props;
    const nextMentions = nextProps.mentions;
    const currLength = mentions.length;
    const nextLength = nextMentions.length;
    const shouldAdd = currLength < nextLength;
    const shouldRemove = currLength > nextLength;

    if (shouldAdd && onAdd) {
      onAdd({
        mentions: nextMentions,
        changed: [last(nextMentions)]
      });
    }

    if (shouldRemove && onRemove) {
      onRemove(diffMentionState(mentions, nextMentions));
    }

    this.setState({
      shouldRender: shouldAdd
    });
  }

  componentDidUpdate() {
    const { shouldRender } = this.state;
    const { editor, mentions } = this.props;
    const mentionsValid = mentions && mentions.length;

    if (editor && mentionsValid && shouldRender) {
      this._renderMentionIntoEditor();
    }
  }

  _renderMentionIntoEditor() {
    const { customRTEMention, editor, mentions } = this.props;

    tinymce.activeEditor.insertContent('insertionplaceholder');

    const mention = last(mentions);

    const markup = customRTEMention
      ? customRTEMention({...mention})
      : <EditorMention {...mention} />;

    editor.setContent(
      editor
        .getContent()
        .replace(/@\w+insertionplaceholder\b/, renderComponent(markup)));

    setTimeout(() => {
      editor.selection.select(editor.dom.get(mention.tinymceId), true);
      editor.selection.collapse(false);
    });
  }

  render() {
    return null;
  }
}
