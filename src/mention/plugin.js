import MentionPlugin from 'mention/plugin/MentionPlugin';

export function initializeMentions(store) {
  return new Promise( resolve => {
    window.tinymce.create('tinymce.plugins.Mention', {
      init(editor) {
        resolve(editor, new MentionPlugin({
          editor,
          store
        }));
      }
    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}
