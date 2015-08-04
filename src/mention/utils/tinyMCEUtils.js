import invariant from 'invariant';

export function prevCharIsSpace(ed) {
  const editor = ed || window.tinymce.activeEditor;

  invariant(editor,
    'Error detecting previous char: `editor` is undefined.'
  );

  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';
  const character = text.substr(start - 1, 1);


  return !!character.trim().length ? false : true;
}

export function removeMention(ed, mention) {
  const editor = ed || window.tinymce.activeEditor;
  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';

  return text.substr(start, text.length - mention.length);
}
