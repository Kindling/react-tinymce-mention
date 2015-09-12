import {
  getLastChar,
  collectMentionIds
} from '../tinyMCEUtils';
import initializeEditor from '../../__tests__/fixtures/initializeEditor';

describe('tinyMCEUtils', () => {

  beforeEach(function() {
    tinymce = initializeEditor();
  });

  it('return the last character in a text area', () => {
    tinymce.activeEditor.setContent('<p>lorem ipsum</p>');
    tinymce.activeEditor.focus();
    expect(getLastChar(tinymce.activeEditor)).toEqual('m');
  });

  it('return the ids of all mentions in an editor', () => {
    tinymce.activeEditor.setContent('<p><a href="#" id="1" class="mention">mention</a> lorem ipsum</p>');
    expect(collectMentionIds(tinymce.activeEditor, '.mention')).toEqual(['1']);
  });
});
