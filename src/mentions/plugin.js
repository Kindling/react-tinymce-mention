window.tinymce.create('tinymce.plugins.Mentions', {
  init() {
    console.log('plugin initialized');
  }
});

window.tinymce.PluginManager.add('mentions', window.tinymce.plugins.Mentions);
