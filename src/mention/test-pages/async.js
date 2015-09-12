import React from 'react';
import TinyMCE from 'react-tinymce';
import Mention from '../Mention';
import axios from 'axios';

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

const initialContent = '';

React.render(
  <div>
    <TinyMCE
      content={initialContent}
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
      delimiter={'@'}
      showDebugger={true}
      asyncDataSource={(query) => {
        return new Promise(resolve => {
          axios.get(`/examples/shared/api/complex.json?q=${query}`)
            .then(response => {
              resolve(transformDataSource(response.data));
            });
        });
      }}
      transformFn={transformDataSource}
      customRTEMention={(props) => {
        const { tinymceId, displayLabel } = props;
        return (
          <span>
            <a href='#' id={tinymceId} className='tinymce-mention'>
              @{displayLabel}
            </a>
            &nbsp;
          </span>
        );
      }}
      onAdd={({ mentions, changed }) =>
        console.log('Added', mentions, changed) }
      onRemove={({ mentions, changed }) =>
        console.log('Removed', mentions, changed) }
    />
  </div>
, document.getElementById('root'));

function transformDataSource(dataSource) {
  const complexDataSource = dataSource.map(result => {
    const { fullName } = result;
    return {
      searchKey: fullName,
      displayLabel: fullName
    };
  });

  return complexDataSource;
}
