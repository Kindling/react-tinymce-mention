import $ from 'jquery';
import _ from 'lodash-node';
import { query, resetQuery } from 'mention/actions/mentionActions';

export default class MentionPlugin {

  constructor({ editor, store }) {
    if (_.isUndefined(editor)) {
      throw new Error('Error initializing MentionPlugin: `editor` cannot be undefined.');
    }

    if (_.isUndefined(store)) {
      throw new Error('Error initializing MentionPlugin: `store` cannot be undefined.');
    }

    this.store = store;
    this.editor = editor;

    // FIXME: Remove helper refs
    window.editor = editor;
    window.$ = $;

    this.delimiter = this.getDelimiter();
    this.addEventListeners();
  }

  addEventListeners() {
    this.editor.on('keypress', ::this.handleKeyPress);
    this.editor.on('keyup', ::this.handleBackspaceKey);
  }

  handleKeyPress(event) {
    const keyCode = String.fromCharCode(event.which || event.keyCode);
    const delimiterIndex = _.indexOf(this.delimiter, keyCode);

    if (delimiterIndex > -1 && this.prevCharIsSpace()) {
      // event.preventDefault();
      // editor.execCommand('mceInsertContent', false, '@');
      // window.parent.focus();
      // console.log('should add autocomplete', store.dispatch(fetch()));

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
    this.store.dispatch(query(character));
  }

  startTrackingInput() {
    this.editor.on('keypress', ::this.handleTrackInput);
  }

  stopTrackingInput() {
    this.editor.off('keypress', this.handleTrackInput);
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
