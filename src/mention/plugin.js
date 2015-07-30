import $ from 'jquery';
import _ from 'lodash-node';
import { fetch } from 'mention/actions/mentionActions';

export function initializeMentions(store) {
  return new Promise( resolve => {
    window.tinymce.create('tinymce.plugins.Mention', {

      init(editor) {
        var { delimiter } = editor.getParam('mention');
        var autoComplete;

        window.editor = editor;
        window.$ = $;

        // Format delimiters from config
        if (!_.isUndefined(delimiter)) {
          delimiter = !_.isArray(delimiter) ? [delimiter] : delimiter;
        } else {
          delimiter = ['@'];
        }

        function prevCharIsSpace() {
          const start = editor.selection.getRng(true).startOffset;
          const text = editor.selection.getRng(true).startContainer.data || '';
          const character = text.substr(start - 1, 1);

          return !!character.trim().length ? false : true;
        }

        editor.on('keypress', function(event) {
          const keyCode = String.fromCharCode(event.which || event.keyCode);
          const delimiterIndex = _.indexOf(delimiter, keyCode);

          if (delimiterIndex > -1 && prevCharIsSpace()) {
            if (autoComplete === undefined || (autoComplete.hasFocus !== undefined && !autoComplete.hasFocus)) {
              event.preventDefault();
              editor.execCommand('mceInsertContent', false, '@');
              window.parent.focus();

              console.log('should add autocomplete', store.dispatch(fetch()));
            }
          }
        });

        resolve(editor);
      }
    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}
