import _ from 'lodash-node';
import * as MentionActionTypes from 'mentions/constants/MentionActionTypes';

export function initializeMentions(redux) {
  return new Promise( resolve => {
    window.tinymce.create('tinymce.plugins.Mentions', {

      init(editor) {
        var { delimiter } = editor.getParam('mentions');
        var autoComplete;

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

              console.log('should add autocomplete', redux.dispatch(MentionActionTypes.SHOW_USERS));
            }
          }
        });

        resolve(editor);
      }
    });

    window.tinymce.PluginManager.add('mentions', window.tinymce.plugins.Mentions);
  });
}
