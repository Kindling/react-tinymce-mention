import 'babel/polyfill';
import React from 'react';
import TinyMCE from 'react-tinymce';
import Mention from '../../Mention';
import simpleDataSource from '../../reducers/__tests__/fixtures/simple';

const plugins = [
  'autolink',
  'autoresize',
  'code',
  'image',
  'link',
  'media',
  'mention',
  'tabfocus'
];

export default function initializeEditor() {
  var domNode = createContainer();

  React.render(
    <div>
      <TinyMCE
        content={''}
        config={{
          extended_valid_elements: 'blockquote[dir|style|cite|class|dir<ltr?rtl],iframe[src|frameborder|style|scrolling|class|width|height|name|align],pre',
          menubar: false,
          plugins: plugins.join(','),
          skin: 'kindling',
          statusbar: false,
          theme: 'kindling',
          toolbar: 'bold italic underline strikethrough | bullist numlist blockquote | link unlink | image media | removeformat code'
        }}
      />
      <Mention
        dataSource={simpleDataSource}
        delimiter={'@'}
      />
    </div>
  , domNode);

  return window.tinymce;
}

function createContainer() {
  const root = document.createElement('div');
  const id = 'root';
  root.setAttribute('id', id);
  document.body.appendChild(root);
  return document.getElementById(id);
}
