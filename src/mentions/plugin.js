import _ from 'lodash-node';

window.tinymce.create('tinymce.plugins.Mentions', {

  init(editor) {
    var autoCompleteData = editor.getParam('mentions');
    var autoComplete, delimiter;

    // Format delimiters from config
    if (!_.isUndefined(autoCompleteData.delimiter)) {
      delimiter = !_.isArray(autoCompleteData.delimiter)
        ? [autoCompleteData.delimiter]
        : autoCompleteData.delimiter;
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
      console.log(delimiterIndex);

      if (delimiterIndex > -1 && prevCharIsSpace()) {
        if (autoComplete === undefined || (autoComplete.hasFocus !== undefined && !autoComplete.hasFocus)) {
          event.preventDefault();

          console.log('should add autocomplete');
        }
      }
    });
  }

});

window.tinymce.PluginManager.add('mentions', window.tinymce.plugins.Mentions);
