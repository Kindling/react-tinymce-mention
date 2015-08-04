import invariant from 'invariant';

// tinyMCE.activeEditor.selection.select(tinyMCE.activeEditor.dom.select('p')[0]);

function getContent(editor) {
  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';

  return {
    start, text
  };
}

export function prevCharIsSpace(ed) {
  const editor = ed || window.tinymce.activeEditor;

  invariant(editor,
    'Error detecting previous char: `editor` is undefined.'
  );

  const { start, text } = getContent(editor);
  const character = text.substr(start - 1, 1);

  return !!character.trim().length ? false : true;
}

export function removeMention(ed, startPos, endPos) {
  const editor = ed || window.tinymce.activeEditor;

  invariant(editor,
    'Error removing mention: `editor` is undefined.'
  );

  const { text } = getContent(editor);
  const result = text.slice(0, -(endPos - (startPos + 1)));

  return result + ' ';
}
