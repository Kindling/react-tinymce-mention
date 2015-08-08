import isEqual from 'lodash.isequal';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { findMentions, removeMention } from 'mention/utils/tinyMCEUtils';
import last from 'mention/utils/last';
import renderComponent from 'mention/utils/renderComponent';
import EditorMention from 'mention/components/EditorMention';

@connect(state => ({
  editor: state.mention.editor,
  mentions: state.mention.mentions
}))
export default class TinyMCEDelegate extends Component {

  static propTypes = {
    editor: PropTypes.object,
    mentions: PropTypes.array,
    onAdd: PropTypes.func
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.editor, this.props.editor)
        || !isEqual(nextProps.mentions, this.props.mentions);
  }

  componentWillReceiveProps(nextProps) {
    const currLength = this.props.mentions.length;
    const nextLength = nextProps.mentions.length;

    this.setState({
      shouldRender: currLength <= nextLength
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

    editor.setContent(removeMention(editor, startPos));
    editor.selection.select(editor.getBody(), true);
    editor.selection.collapse(false);
  }

  _renderMentionIntoEditor() {
    const { editor, mentions, onAdd } = this.props;
    const mention = last(mentions);

    const markup = renderComponent(
      <EditorMention mention={mention} />
    );

    // Insert new link and exit styling
    editor.execCommand('mceInsertContent', false,
      markup + '&nbsp;'
    );

    if (onAdd) {
      onAdd(mention);
    }
  }

  render() {
    return null;
  }
}
