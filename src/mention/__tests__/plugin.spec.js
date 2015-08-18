import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import findWhere from 'lodash.findwhere'
import { initializePlugin } from '../plugin';
import mentionReducer from '../reducers/mentionReducer';
import simpleDataSource from '../reducers/__tests__/fixtures/simple';
import initializeEditor from './fixtures/initializeEditor';
import { testExports } from '../plugin';

import {
  query,
  select,
} from '../actions/mentionActions';


const {
  _performIntermediateActions,
  _isNearMention,
  _removeMentionFromEditor,
  _handleEditorBackspace,
} = testExports;

describe('TinyMCE Plugin', () => {
  var store, tinymce, editor;

  const dataSource = simpleDataSource.sort().map(source => {
    return {
      searchKey: source,
      displayLabel: source
    }
  })

  const getState = () => {
    const state = store.getState()
    state.mentions.forEach(mention => delete mention.tinymceId)
    return state
  }

  const find = (name) => findWhere(dataSource, { displayLabel: name })

  beforeEach((done) => {
    jasmine.addMatchers({
      toDeepEqual: function() {
        return {
          compare: function(actual, expected) {
            return {
              pass: isEqual(actual, expected)
            }
          }
        }
      }
    })

    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

    store = createStoreWithMiddleware(mentionReducer, {
      dataSource: dataSource,
      highlightIndex: 0,
      mentions: [],
      query: ''
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

  // _isNearMention
  it('should be near mentions from the editor', () => {
    const str = 'Hello there @jim and @john';
    expect(_isNearMention(str).toString()).toEqual('@john');
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
    expect(editor.selection.innerText).toEqual('');
  });

  // _performIntermediateActions
  it('should validate key-presses and checks for intermediate actions', () => {
    store.dispatch(query('al'));
    _performIntermediateActions(38, {
      preventDefault(){
        return false;
      }
    });
    store.dispatch(select());
    expect(getState().mentions).toEqual([
      find('alex gray')
    ]);
  });
});
