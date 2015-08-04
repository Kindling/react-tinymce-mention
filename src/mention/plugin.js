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

        // Add top-level listener for delegating events related to
        // binding and unbinding events related to the UI / querying.
        editor.on('keypress', function(event) {
          const character = String.fromCharCode(event.which || event.keyCode);
          const delimiterIndex = _.indexOf(delimiter, character);

          // User has typed `@`; begin tracking
          if (delimiterIndex > -1 && prevCharIsSpace(editor)) {
            if (!mentionPlugin.isFocused) {
              mentionPlugin.initialize();
            }

          // User has exited mentions, stop tracking
          } else if (prevCharIsSpace(editor) || character === ' ') {
            if (mentionPlugin.isFocused) {
              mentionPlugin.cleanup();
            }
          }
        });
      }
    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}

export class MentionPlugin {

  insideWord = -1;
  isFocused = false;

  constructor(editor, store, delimiter) {

    invariant(editor,
      'Error initializing MentionPlugin: `editor` cannot be undefined.'
    );

    invariant(store,
      'Error initializing MentionPlugin: `store` cannot be undefined.'
    );

    this.store = store;
    this.editor = editor;
    this.delimiter = delimiter;

    // FIXME: Remove helper refs
    window.editor = editor;
    window.$ = $;
    window.mentionPlugin = this;

    return this;
  }

  initialize() {
    if (!this.isFocued) {
      this.isFocused = true;
      this.addEventListeners();
    }
  }

  cleanup() {
    if (this.isFocused) {
      this.isFocused = false;
      this.store.dispatch(resetQuery());
      this.removeEventListeners();
    }
  }

  addEventListeners() {
    this.editor.on('keydown', this.keyPressProxy = $.proxy(this.handleKeyPress, this));
    this.editor.on('keyup', this.keyUpProxy = $.proxy(this.handleBackspaceKey, this));
  }

  removeEventListeners() {
    this.editor.off('keydown', this.keyPressProxy);
    this.editor.off('keyup', this.keyUpProxy);
  }

  handleKeyPress(event) {
    const character = String.fromCharCode(event.which || event.keyCode);

    _.defer(() => {
      console.log(character);

      const content = this.editor.getContent({
        format: 'text'
      });

      const mentions = _.last(twitter.extractMentionsWithIndices(content));

      if (mentions && this.isFocused) {
        this.store.dispatch(query(mentions.screenName));
      }
    });
  }

  handleBackspaceKey(event) {
    const keyCode = event.which || event.keyCode;

    // Backspace key
    if (keyCode === 8) {
      console.log('backspace');

      // TODO: Narrow this to a reasonable start and end range.
      const content = this.editor.getContent({
        format: 'text'
      });

      // Check to see if the surrounding area contains an @
      // and only match the immediate contents.
      const re = /@\w+\b(?! *.)/;
      const match = re.exec(content);
    }
  }

  // handleBackspaceKey(event) {
  //   const keyCode = event.which || event.keyCode;
  //
  //   // Backspace key
  //   if (keyCode === 8) {
  //
  //     // TODO: Narrow this to a reasonable start and end range.
  //     const content = this.editor.getContent({
  //       format: 'text'
  //     });
  //
  //     // Check to see if the surrounding area contains an @
  //     // and only match the immediate contents.
  //     const re = /@\w+\b(?! *.)/;
  //     const match = re.exec(content);
  //
  //     return;
  //     if (match) {
  //
  //       // Increment until truthy so that we can remove mention
  //       // only after we've entered the word, e.g. `@joh|n`.
  //       this.insideWord++;
  //
  //       if (this.insideWord) {
  //         const mentions = _.last(twitter.extractMentionsWithIndices(content));
  //
  //         const {
  //           screenName,
  //           indices: [startPos, endPos]
  //         } = mentions;
  //
  //         this.editor.setContent(removeMention(this.editor, startPos, endPos));
  //
  //         // Set cursor at the very end
  //         this.editor.selection.select(this.editor.getBody(), true);
  //         this.editor.selection.collapse(false);
  //
  //         this.store.dispatch(remove(screenName));
  //
  //         // Reset index after removal and continue listening.
  //         this.insideWord = -1;
  //       }
  //     }
  //   }
  // }
}
