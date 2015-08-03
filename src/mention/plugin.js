import $ from 'jquery';
import _ from 'lodash-node';
import invariant from 'invariant';
import { query, resetQuery } from 'mention/actions/mentionActions';

export function initializePlugin(store) {
  return new Promise( resolve => {
    window.tinymce.create('tinymce.plugins.Mention', {
      init(editor) {
        const mentionPlugin = new MentionPlugin({
          editor,
          store
        });

        resolve(editor, mentionPlugin);
      }
    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}

class MentionPlugin {

  constructor({ editor, store }) {

    invariant(editor,
      'Error initializing MentionPlugin: `editor` cannot be undefined.'
    );

    invariant(store,
      'Error initializing MentionPlugin: `store` cannot be undefined.'
    );

    this.store = store;
    this.editor = editor;

    // FIXME: Remove helper refs
    window.editor = editor;
    window.$ = $;

    this.delimiter = this.getDelimiter();
    this.addEventListeners();

    return this;
  }

  addEventListeners() {
    this.editor.on('keypress', ::this.handleKeyPress);
    this.editor.on('keyup', ::this.handleBackspaceKey);
  }

  handleKeyPress(event) {
    const keyCode = String.fromCharCode(event.which || event.keyCode);
    const delimiterIndex = _.indexOf(this.delimiter, keyCode);

    if (delimiterIndex > -1 && this.prevCharIsSpace()) {
      this.startTrackingInput();

    // Stop tracking if we've exited the @ zone.
    } else if (this.prevCharIsSpace()) {
      this.stopTrackingInput();
    }
  }

  handleBackspaceKey(event) {
    const keyCode = event.which || event.keyCode;

    // Backspace key
    if (keyCode === 8) {

      // TODO: Narrow this to a reasonable start and end range.
      const content = this.editor.getContent({format: 'text'});

      // Check to see if the surrounding area contains an @
      // and only match the immediate contents.
      const re = /@\w+\b(?! )/;
      const match = re.exec(content);

      if (match) {

        // Pop the @ symbol off, and update the entire query
        // so that we can filter properly.
        const searchQuery = _.rest(_.first(match).split('')).join('');

        this.store.dispatch(query(searchQuery, {
          aggrigate: false
        }));
      }
    }
  }

  handleTrackInput(event) {
    const character = String.fromCharCode(event.which || event.keyCode);

    if (character === ' ') {
      return this.stopTrackingInput();
    }

    this.store.dispatch(query(character));
  }

  startTrackingInput() {
    this.editor.on('keydown', this.handleTrackInput.bind(this));
  }

  stopTrackingInput() {
    this.editor.off('keydown');
    this.store.dispatch(resetQuery());
  }

  prevCharIsSpace() {
    const start = this.editor.selection.getRng(true).startOffset;
    const text = this.editor.selection.getRng(true).startContainer.data || '';
    const character = text.substr(start - 1, 1);

    return !!character.trim().length ? false : true;
  }

  getDelimiter() {
    var { delimiter } = this.editor.getParam('mention');

    if (!_.isUndefined(delimiter)) {
      delimiter = !_.isArray(delimiter) ? [delimiter] : delimiter;
    } else {
      delimiter = ['@'];
    }

    return delimiter;
  }
}
