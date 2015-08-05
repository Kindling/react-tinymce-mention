import _ from 'lodash-node';
import invariant from 'invariant';
import twitter from 'twitter-text';

// tinyMCE.activeEditor.selection.select(tinyMCE.activeEditor.dom.select('p')[0]);

/**
 * Helper function for returning the current content
 *
 * @param  {Editor} editor
 * @return {Object} returns the `start` and `text`.
 */
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

/**
 * Detects if the previous character in the editor is an empty space.
 *
 * @param  {Object} editor
 * @return {Boolean}
 */
export function prevCharIsSpace(editor) {
  invariant(editor,
    'Error detecting previous char: `editor` is undefined.'
  );

  const { start, text } = getContent(editor);
  const character = text.substr(start - 1, 1);

  return !!character.trim().length ? false : true;
}

/**
 * Removes a mention from the editor.
 *
 * @param  {Editor} editor
 * @param  {Number} startPos Start position to begin removal
 * @param  {Number} endPos   End position to remove to
 * @return {String} the updated content without mentions
 */
export function removeMention(editor, text, startPos, endPos) {
  invariant(editor,
    'Error removing mention: `editor` is undefined.'
  );

  // Extract the mention but keep the delimiter around
  return text.slice(0, -(endPos - (startPos - 1))) + '&nbsp;';
}

/**
 * Finds mentions within the current editor window.
 *
 * @param  {Editor} editor
 * @return {Object} Returns an object containing the current mentions
 */
export function findMentions(editor) {
  const content = editor.getContent({
    format: 'text'
  });

  const mentions = twitter.extractMentionsWithIndices(content);
  const lastMention = _.last(mentions);
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
