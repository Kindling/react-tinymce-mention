import twitter from 'twitter-text';
import findWhere from 'lodash.findwhere';
import last from './last';
import spliceString from './spliceString';

export function prevCharIsSpace(editor) {
  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';
  const character = text.substr(start - 1, 1);

  return !!character.trim().length ? false : true;
}

export function getLastChar(editor) {
  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';
  const character = text.substr(start - 1, 1);
  return character;
}

export function removeMentionAndInsertPlaceholder(editor, startPos, endPos, screenName, placeholder) {
  return spliceString(editor.getContent(), startPos + 1, screenName.length, placeholder);
}

export function findMentions(editor, mention) {
  const content = editor.getContent();
  const mentions = twitter.extractMentionsWithIndices(content);
  const mentionText = mention.displayLabel;
  console.log(mentionText, mentions);
  const lastMention = last(mentions);

  console.log(mentionText);
  const foundMention = findWhere(mentions, {
    screenName: mentionText
  });

  console.log(foundMention);

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
