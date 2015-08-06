import $ from 'jquery';
import _ from 'lodash-node';
import invariant from 'invariant';
import twitter from 'twitter-text';
import { prevCharIsSpace } from 'mention/utils/tinyMCEUtils';

import {
  moveDown,
  moveUp,
  query,
  remove,
  resetMentions,
  resetQuery,
  select
} from 'mention/actions/mentionActions';

const Keys = {
  BACKSPACE: 8,
  DOWN: 40,
  ENTER: 13,
  SPACE: 32,
  TAB: 9,
  UP: 38
};

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

      /**
       * Callback when the Editor has been registered and is ready
       * to accept plugin initialization.
       * @param  {Object} editor The editor
       */
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

        // Add persistent top-level listener for delegating events related
        // to binding and unbinding events related to the UI / querying.
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

        editor.on('keyup', mentionPlugin.handleBackspaceKey.bind(mentionPlugin));
      }
    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}

class MentionPlugin {

  /**
   * Checks if we're currently focused on @mention lookup.
   * @type {Boolean}
   */
  isFocued = false;

  /**
   * The Redux store for handling lookups, mentions and tracking.
   * @type {Object}
   */
  store = null;

  /**
   * Reference to the TinyMCE editor.
   * @type {Object}
   */
  editor = null;

  /**
   * The delimiter we're using to trigger @mentions. Defaults to @.
   * @type {String}
   */
  delimiter = '@';


  constructor(editor, store, delimiter) {

    invariant(editor,
      'Error initializing MentionPlugin: `editor` cannot be undefined.'
    );

    invariant(store,
      'Error initializing MentionPlugin: `store` cannot be undefined.'
    );

    this.isFocused = false;
    this.store = store;
    this.editor = editor;
    this.delimiter = delimiter;

    // FIXME: Remove helper refs
    window.editor = editor;
    window.$ = $;
    window.mentionPlugin = this;

    return this;
  }

  /**
   * Initializes the MentionPlugin once a user has typed the delimiter.
   *
   * @return {MentionPlugin}
   */
  initialize() {
    if (!this.isFocued) {
      this.isFocused = true;
      this.addEventListeners();
    }
  }

  /**
   * Cleans up all event listeners and de-initializes plugin. Triggered
   * when outer listener detects a literal ' ' in entry, signifying
   * that we've exited the @mention lookup.
   */
  cleanup() {
    if (this.isFocused) {
      this.isFocused = false;
      this.store.dispatch(resetQuery());
      this.removeEventListeners();
    }
  }

  addEventListeners() {
    this.editor.on('keydown', this.keyPressProxy = this.handleKeyPress.bind(this));
  }

  removeEventListeners() {
    this.editor.off('keydown', this.keyPressProxy);
  }

  /**
   * Handler for internal key-presses. Parses the input and dispatches
   * queries back to the store for list view and selection.
   *
   * @param  {jQuery.Event}
   */
  handleKeyPress(event) {
    const keyCode = event.which || event.keyCode;

    // Override default behavior if we're using anything from our keyset.
    _.each(Keys, (key) => {
      if (keyCode === key && key !== Keys.BACKSPACE) {
        event.preventDefault();
      }
    });

    switch(keyCode) {
    case Keys.TAB:
      return this.store.dispatch(select());
    case Keys.ENTER:
      return this.store.dispatch(select());
    case Keys.DOWN:
      return this.store.dispatch(moveDown());
    case Keys.UP:
      return this.store.dispatch(moveUp());
    }

    _.defer(() => {
      const content = this.editor.getContent({
        format: 'text'
      });

      // Only matches @ if cursor is inside or around; e.g. "hello @jim and [@chri|s]".
      const re = /@\w+\b(?! *.)/;
      const match = re.exec(content);

      if (match) {
        const mentions = _.last(twitter.extractMentionsWithIndices(content));

        if (mentions && this.isFocused) {
          this.store.dispatch(query(mentions.screenName));
        }
      }
    });
  }

  /**
   * Handler for backspace presses. Dispatches back to store with request
   * to reset the current query and matches.
   *
   * @param  {jQuery.Event}
   */
  handleBackspaceKey(event) {
    const keyCode = event.which || event.keyCode;

    if (keyCode === Keys.BACKSPACE) {

      // Check to see if the surrounding area contains an @ and remove.
      const $node = $(this.editor.selection.getNode()).closest('.mention');

      if ($node.length) {
        const mention = $node
          .first()
          .text()
          .replace(/(?:@|_)/g, ' ')
          .trim();

        this.store.dispatch(remove(mention));

        // Remove @mention node from editor
        $node.remove();

      // Check to see if we've erased all content
      } else {
        const content = this.editor.getContent({ format: 'text' }).trim();

        if (_.isEmpty(content)) {
          this.store.dispatch(resetMentions());
        }
      }
    }
  }
}
