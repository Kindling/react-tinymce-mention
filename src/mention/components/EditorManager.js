import _ from 'lodash-node';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { findMentions, removeMention } from 'mention/utils/tinyMCEUtils';
import renderComponent from 'mention/utils/renderComponent';
import Mention from 'mention/components/Mention';

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
      this._clearUnfinishedMention();
      this._renderMentionIntoEditor();
    }
  }

  /**
   * Remove last mention and set cursor at the very end
   * in order to replace with proper Mention component.
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
    const { editor, mentions } = this.props;
    const mention = _.last(mentions);

    const markup = renderComponent(
      <Mention mention={mention} />
    );

    // Insert new link and exit styling
    editor.execCommand('mceInsertContent', false,
      markup + '&nbsp;'
    );
  }

  render() {
    return null;
  }
}
