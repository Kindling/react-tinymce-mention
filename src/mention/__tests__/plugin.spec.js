import { initializePlugin } from '../plugin';
import mentionReducer from '../reducers/mentionReducer';
import simpleDataSource from '../reducers/__tests__/fixtures/simple';
import initializeRedux from '../utils/initializeRedux';
import initializeEditor from './fixtures/initializeEditor';
import { testExports } from '../plugin';

// FIXME Rewrite intern tests

import {
  query,
  select,
} from '../actions/mentionActions';


const {
  _removeMentionFromEditor,
  _handleEditorBackspace,
} = testExports;

describe('TinyMCE Plugin', () => {
  var store, tinymce, editor;

  const dataSource = simpleDataSource.sort().map(source => {
    return {
      searchKey: source,
      displayLabel: source
    };
  });

  beforeEach((done) => {
    jasmine.addMatchers({
      toDeepEqual: function() {
        return {
          compare: function(actual, expected) {
            return {
              pass: isEqual(actual, expected)
            };
          }
        };
      }
    });

    store = initializeRedux({ mention: mentionReducer }, {
      mention: {
        asyncDataSource: false,
        dataSource: dataSource,
        highlightIndex: 0,
        mentions: [],
        query: ''
      }
    });

    tinymce = initializeEditor();
    initializePlugin(store, dataSource, '@');

    setTimeout(() => {
      editor = tinymce.activeEditor;
      done();
    }, 10);
  });

  afterEach(() => {
    store = null;
    editor = null;
  });

  // _removeMentionFromEditor
  it('should remove mention from the Editor', () => {
    store.dispatch(query('eric'));
    store.dispatch(select());

    var mentionNode = document.createElement('strong');
    const node = document.createTextNode('@eric kong');
    mentionNode.appendChild(node);
    expect(_removeMentionFromEditor(mentionNode)).toEqual('eric kong');

    store.dispatch(query('tim'));
    store.dispatch(select());

    var mentionNode2 = document.createElement('p');
    const node2 = document.createTextNode('@timothy meaney');
    mentionNode2.appendChild(node2);
    expect(_removeMentionFromEditor(mentionNode2)).toEqual('timothy meaney');
  });

  // _handleEditorBackspace
  xit('should handle backspace presses & reset the current query', () => {
    var mentionNode = document.createElement('strong');
    const node = document.createTextNode('@eric kong');
    mentionNode.appendChild(node);
    mentionNode.className = 'mention';
    editor.selection = mentionNode;
    editor.selection.getNode = function() {
      return editor.selection.innerHTML.substring(1);
    };
    editor.selection = editor.selection.getNode();
    editor.setContent(editor.selection);

    _handleEditorBackspace({keyCode: 8});
    expect(editor.selection.textContent).toEqual('');
  });
});
