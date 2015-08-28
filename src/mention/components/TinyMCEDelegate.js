import isEqual from 'lodash.isequal';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import diffMentionState from '../utils/diffMentionState';
import last from '../utils/last';
import renderComponent from '../utils/renderComponent';
import { exitSelection } from '../utils/tinyMCEUtils';
import EditorMention from '../components/EditorMention';

const placeholder = '[__display__]';

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
      this._clearUnfinishedMention();
      this._renderMentionIntoEditor();
    }
  }

  /**
   * Remove last, incomplete mention before autocomplete (@carl_be...)
   * and sets cursor at the end in order to replace with proper Mention
   * component.
   */
  _clearUnfinishedMention() {
    const { editor } = this.props;
    const rangeText = editor.selection.getRng(true).startContainer.data;
    const searchText = rangeText ? rangeText : editor.getContent();
    const re = /@\w+\b/;
    const match = re.exec(searchText.trim());

    if (match) {
      console.log(match);
      editor.setContent(
        editor
          .getContent()
          .replace(match[0], placeholder));

      if (!rangeText) {
        exitSelection(editor);
      }
    }
  }

  _renderMentionIntoEditor() {
    const { customRTEMention, editor, mentions } = this.props;
    const mention = last(mentions);

    const markup = customRTEMention
      ? customRTEMention({...mention})
      : <EditorMention {...mention} />;

    editor.setContent(
      editor
        .getContent()
        .replace(placeholder, renderComponent(markup)));

    setTimeout(() => {
      editor.selection.select(editor.dom.get(mention.tinymceId), true);
      editor.selection.collapse(false);
    });
  }

  render() {
    return null;
  }
}
