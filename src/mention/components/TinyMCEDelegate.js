import isEqual from 'lodash.isequal';
import difference from 'lodash.difference';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { exitSelection, findMentions, removeMention } from '../utils/tinyMCEUtils';
import last from '../utils/last';
import uid from '../utils/uid';
import renderComponent from '../utils/renderComponent';
import EditorMention from '../components/EditorMention';

@connect(state => ({
  editor: state.mention.editor,
  mentions: state.mention.mentions
}))
export default class TinyMCEDelegate extends Component {

  static propTypes = {
    editor: PropTypes.object,
    mentions: PropTypes.array,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
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
    const shouldRender = currLength < nextLength;
    const shouldDispatchRemove = currLength > nextLength;

    if (shouldDispatchRemove) {
      const diff = difference(mentions, nextMentions);

      onRemove({
        mentions: nextMentions,
        changed: diff.length > 1 ? diff : diff[0]
      });
    }

    if (shouldRender) {
      onAdd({
        mentions: nextMentions,
        changed: last(nextMentions)
      });
    }

    this.setState({
      shouldRender
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
    const { lastMention } = findMentions(editor);
    const { startPos } = lastMention;

    // First remove the mention
    editor.setContent(removeMention(editor, startPos));
    editor.selection.select(editor.getBody(), true);
    editor.selection.collapse(false);

    // The clean the body if we're at the beginning; tinMCE weirdly
    // inserts invalid markup.
    const text = editor.getBody()
    const tinymceWeirdMatch = '<p>&nbsp;<br></p>';

    if (text.innerHTML === tinymceWeirdMatch) {
      editor.setContent('');
    }
  }

  _renderMentionIntoEditor() {
    const { editor, mentions } = this.props;
    const mention = last(mentions);
    const text = editor.getBody().innerText;
    const insertLeadingSpace = text.trim().length !== 0;
    const spaceUid = uid('space-');

    const markup = renderComponent(
      <EditorMention
        {...mention}
      />
    );

    const formattedMarkup = insertLeadingSpace
      ? ` ${markup}`
      :  `${markup}`;

    // Insert new link and exit styling via
    editor.execCommand('mceInsertRawHTML', false,
      `${formattedMarkup}<span id="${spaceUid}"> \u200C</span>`
    );

    exitSelection(editor);

  }

  render() {
    return null;
  }
}
