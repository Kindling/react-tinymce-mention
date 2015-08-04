import $ from 'jquery';
import _ from 'lodash-node';
import invariant from 'invariant';
import twitter from 'twitter-text';
import { query, remove, resetQuery } from 'mention/actions/mentionActions';
import { prevCharIsSpace, removeMention } from 'mention/utils/tinyMCEUtils';

export function initializePlugin(store, dataSource, delimiter = '@') {

  invariant(store,
    'Plugin must be initialized with a Redux store.'
  );

  invariant(dataSource,
    'Plugin must be initialized with a dataSource.  Datasource can be an array or promise.'
  );

  return new Promise((resolve, reject) => {

    if (_.isUndefined(window.tinymce)) {
      return reject('Error initializing Mention plugin: `tinymce` is undefined.');
    }

    window.tinymce.create('tinymce.plugins.Mention', {
      init(editor) {
        const mentionPlugin = new MentionPlugin(editor, store, delimiter);
        const resolveInit = () => resolve(editor, mentionPlugin);

        // Check if we're using a promise the dataSource or a
        // raw array.  If promise, wait for it to resolve before
        // resolving the outer promise and initializing the app.
        if (_.isFunction(dataSource.then)) {

          // TODO: Implement promise-based lookup
          resolveInit();
        } else {
          resolveInit();
        }
      }
    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}

export class MentionPlugin {

  insideWord = -1;

  constructor(editor, store, delimiter) {

    invariant(editor,
      'Error initializing MentionPlugin: `editor` cannot be undefined.'
    );

    invariant(store,
      'Error initializing MentionPlugin: `store` cannot be undefined.'
    );

    this.store = store;
    this.editor = editor;
    this.delimiter = this.getDelimiter(delimiter);

    // FIXME: Remove helper refs
    window.editor = editor;
    window.$ = $;
    window.mentionPlugin = this;

    this.addEventListeners();

    return this;
  }

  addEventListeners() {
    this.editor.on('keypress', ::this.handleKeyPress);
    this.editor.on('keyup', ::this.handleBackspaceKey);
  }

  handleKeyPress(event) {
    const character = String.fromCharCode(event.which || event.keyCode);
    const delimiterIndex = _.indexOf(this.delimiter, character);

    if (delimiterIndex > -1 && prevCharIsSpace(this.editor)) {
      this.startTrackingInput();

    // Stop tracking if we've exited the @ zone.
  } else if (prevCharIsSpace(this.editor)) {
      this.stopTrackingInput();
    }
  }

  handleBackspaceKey(event) {
    const keyCode = event.which || event.keyCode;

    // Backspace key
    if (keyCode === 8) {

      // TODO: Narrow this to a reasonable start and end range.
      const content = this.editor.getContent({
        format: 'text'
      });

      // Check to see if the surrounding area contains an @
      // and only match the immediate contents.
      const re = /@\w+\b(?! *.)/;
      const match = re.exec(content);

      if (match) {

        // Increment until truthy so that we can remove mention
        // only after we've entered the word, e.g. `@joh|n`.
        this.insideWord++;

        if (this.insideWord) {
          const mentions = _.last(twitter.extractMentionsWithIndices(content));

          const {
            screenName,
            indices: [startPos, endPos]
          } = mentions;

          this.editor.setContent(removeMention(this.editor, startPos, endPos));

          // Set cursor at the very end
          this.editor.selection.select(this.editor.getBody(), true);
          this.editor.selection.collapse(false);

          this.store.dispatch(remove(screenName));

          // Reset index after removal and continue listening.
          this.insideWord = -1;
        }
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

  getDelimiter(delimiter) {
    if (!_.isUndefined(delimiter)) {
      delimiter = !_.isArray(delimiter) ? [delimiter] : delimiter;
    } else {
      delimiter = ['@'];
    }

    return delimiter;
  }
}
