import React from 'react';
import TinyMCE from 'react-tinymce';

export default class Editor {
  render() {
    return (
      <div>
        <TinyMCE
          content={''}
          config={{
            extended_valid_elements: 'blockquote[dir|style|cite|class|dir<ltr?rtl],iframe[src|frameborder|style|scrolling|class|width|height|name|align],pre',
            menubar: false,
            plugins: [
              'autolink',
              'autoresize',
              'code',
              'image',
              'link',
              'media',
              'mention',
              'tabfocus'
            ],
            skin: 'kindling',
            statusbar: false,
            theme: 'kindling',
            toolbar: 'bold italic underline strikethrough | bullist numlist blockquote | link unlink | image media | removeformat code'
          }}
        />
      </div>
    );
  }
}
