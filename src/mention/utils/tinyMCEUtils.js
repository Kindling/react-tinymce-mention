import twitter from 'twitter-text';
import last from './last';

export function prevCharIsSpace(editor) {
  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';
  const character = text.substr(start - 1, 1);

  return !!character.trim().length ? false : true;
}

export function removeMention(editor, startPos) {
  return editor.getContent({format : 'html'}).slice(0, startPos);
}

export function findMentions(editor) {
  const content = editor.getContent({ format: 'html' });
  console.log(content);
  const mentions = twitter.extractMentionsWithIndices(content);
  const lastMention = last(mentions);

  if (!lastMention) {
    return false;
  }

  const { screenName, indices: [startPos, endPos] } = lastMention;

  return {
    mentions,
    lastMention: {
      screenName,
      startPos,
      endPos
    }
  };
}

export function getEditorContent(editor, format = 'text') {
  return editor.getContent({ format });
}

export function exitSelection(editor) {
  editor.selection.select(editor.getBody(), true);
  editor.selection.collapse(false);
}

export function collectMentionIds(editor, mentionClassName) {
  const mentions = editor.dom
    .select(mentionClassName)
    .map(mentionNode => mentionNode.id);

  return mentions;
}
