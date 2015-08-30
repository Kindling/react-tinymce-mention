import {
  getLastChar,
  getEditorContent,
  collectMentionIds
} from '../tinyMCEUtils';
import initializeEditor from '../../__tests__/fixtures/initializeEditor';

describe('tinyMCEUtils', () => {

  beforeEach(function() {
    var tinymce = initializeEditor();
  });

  it('return the last character in a text area', () => {
    tinymce.activeEditor.setContent('<p>lorem ipsum</p>');
    // required to force the cursor into the textarea
    tinymce.activeEditor.focus(); 
    expect(getLastChar(tinymce.activeEditor)).toEqual('m');
  });

  it('return the full contents of an editor', () => {
    tinymce.activeEditor.setContent('<p>lorem ipsum</p>');
    expect(getEditorContent(tinymce.activeEditor)).toEqual('lorem ipsum');
    expect(getEditorContent(tinymce.activeEditor, 'raw')).toEqual('<p>lorem ipsum</p>');
  });

  it('return the ids of all mentions in an editor', () => {
    tinymce.activeEditor.setContent('<p><a href="#" id="1" class="mention">mention</a> lorem ipsum</p>');
    expect(collectMentionIds(tinymce.activeEditor, '.mention')).toEqual(['1']);
  });
});
