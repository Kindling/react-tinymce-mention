import invariant from 'invariant';
import twitter from 'twitter-text';
import last from 'mention/utils/last';

export function prevCharIsSpace(editor) {
  invariant(editor,
    'Error detecting previous char: `editor` is undefined.'
  );

  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';
  const character = text.substr(start - 1, 1);

  return !!character.trim().length ? false : true;
}

export function removeMention(editor, startPos) {
  invariant(editor,
    'Error removing mention: `editor` is undefined.'
  );

  return editor.getContent().slice(0, startPos - 1) + '&nbsp;';
}

export function findMentions(editor) {
  invariant(editor,
    'Error finding Mentions: `editor` is undefined.'
  );

  const content = editor.getContent();
  const mentions = twitter.extractMentionsWithIndices(content);
  const lastMention = last(mentions);
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

export function getKeyCode(event) {
  invariant(event,
    'Error returning keyCode: `editor` is undefined.'
  );

  return event.which || event.keyCode;
}

export function getEditorContent(editor, format = 'text') {
  invariant(editor,
    'Error returning editor content: `editor` is undefined.'
  );

  return editor.getContent({ format });
}
