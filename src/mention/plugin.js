import $ from 'jquery';
import _ from 'lodash-node';
import { query, resetQuery } from 'mention/actions/mentionActions';

export function initializeMentions(store) {
  return new Promise( resolve => {
    window.tinymce.create('tinymce.plugins.Mention', {

      init(editor) {
        var { delimiter } = editor.getParam('mention');

        this.editor = editor;
        window.editor = editor;
        window.$ = $;

        // Format delimiters from config
        if (!_.isUndefined(delimiter)) {
          delimiter = !_.isArray(delimiter) ? [delimiter] : delimiter;
        } else {
          delimiter = ['@'];
        }

        this.delimeter = delimiter;

        function prevCharIsSpace() {
          const start = editor.selection.getRng(true).startOffset;
          const text = editor.selection.getRng(true).startContainer.data || '';
          const character = text.substr(start - 1, 1);

          return !!character.trim().length ? false : true;
        }

        editor.on('keypress', (event) => {
          const keyCode = String.fromCharCode(event.which || event.keyCode);
          const delimiterIndex = _.indexOf(delimiter, keyCode);

          if (delimiterIndex > -1 && prevCharIsSpace()) {
            // event.preventDefault();
            // editor.execCommand('mceInsertContent', false, '@');
            // window.parent.focus();
            // console.log('should add autocomplete', store.dispatch(fetch()));

            this.startTrackingInput();

          // Stop tracking if we've exited the @ zone.
          } else if (prevCharIsSpace()) {
            this.stopTrackingInput();
          }
        });

        editor.on('keyup', function(event) {
          const keyCode = event.which || event.keyCode;

          // Backspace key
          if (keyCode === 8) {
            const content = editor.getContent({format: 'text'});

            // Check to see if the surrounding area contains an @
            // and only match the immediate contents.
            const re = /@\w+\b(?! )/;
            const match = re.exec(content);

            if (match) {

              // Pop the @ symbol off, and update the entire query
              // so that we can filter properly.
              const searchQuery = _.rest(_.first(match).split('')).join('');

              store.dispatch(query(searchQuery, {
                aggrigate: false
              }));
            }
          }
        });

        resolve(editor);
      },

      handleTrackInput(event) {
        const character = String.fromCharCode(event.which || event.keyCode);
        store.dispatch(query(character));
      },

      startTrackingInput() {
        this.editor.on('keypress', this.handleTrackInput);
      },

      stopTrackingInput() {
        this.editor.off('keypress', this.handleTrackInput);
        store.dispatch(resetQuery());
      }

    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}
