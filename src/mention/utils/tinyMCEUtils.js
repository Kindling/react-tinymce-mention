import invariant from 'invariant';

// tinyMCE.activeEditor.selection.select(tinyMCE.activeEditor.dom.select('p')[0]);

function getContent(editor) {
  invariant(editor,
    'Error getting content: `editor` is undefined.'
  );

  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';

  return {
    start, text
  };
}

export function prevCharIsSpace(editor) {
  invariant(editor,
    'Error detecting previous char: `editor` is undefined.'
  );

  const { start, text } = getContent(editor);
  const character = text.substr(start - 1, 1);

  return !!character.trim().length ? false : true;
}

export function removeMention(editor, startPos, endPos) {
  invariant(editor,
    'Error removing mention: `editor` is undefined.'
  );

  const { text } = getContent(editor);

  // Extract the mention but keep the delimiter around
  const result = text.slice(0, -(endPos - (startPos + 1)));

  return result + ' ';
}
