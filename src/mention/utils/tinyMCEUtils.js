export function getLastChar(editor, negativeIndex = 1) {
  const start = editor.selection.getRng(true).startOffset;
  const text = editor.selection.getRng(true).startContainer.data || '';
  const character = text.substr(start - negativeIndex, 1);
  return character;
}

export function getEditorContent(editor, format = 'text') {
  return editor.getContent({ format });
}

export function collectMentionIds(editor, mentionClassName) {
  const mentions = editor.dom
    .select(mentionClassName)
    .map(mentionNode => mentionNode.id);

  return mentions;
}
