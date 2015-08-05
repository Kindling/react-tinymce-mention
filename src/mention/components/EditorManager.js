import _ from 'lodash-node';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { findMentions, removeMention } from 'mention/utils/tinyMCEUtils';

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
      const mention = _.last(mentions);
      const uid = _.uniqueId('mention-');
      const { lastMention } = findMentions(editor);
      const { screenName, startPos, endPos } = lastMention;

      // Replace up to currently entered @ment... and replace
      // with full name.
      const content = editor.getContent({
        // format: 'text'
      });

      // Remove last mention and set cursor at the very end
      editor.setContent(removeMention(editor, content, startPos, endPos));
      editor.selection.select(editor.getBody(), true);
      editor.selection.collapse(false);

      const markup = React.renderToStaticMarkup(
        <strong className='test' style={{background: '#ccc'}}>
          <a className={uid} href='foo'>
            @{mention}
          </a>
        </strong>
      );

      console.log(screenName, startPos, endPos);

      // Insert new link
      editor.execCommand('mceInsertContent', false,
        markup
      );

      // Exit styling entry
      editor.execCommand('mceInsertContent', false,
        '&nbsp;'
      );
    }
  }

  render() {
    return null;
  }
}
