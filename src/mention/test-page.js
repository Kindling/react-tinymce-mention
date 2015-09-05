import React from 'react';
import TinyMCE from 'react-tinymce';
import Mention from './Mention';
import complexDataSource from './test-data-source';

var plugins = [
  'autolink',
  'autoresize',
  'code',
  'image',
  'link',
  'media',
  'mention',
  'tabfocus'
];

let initialContent = `Sed ut perspiciatis unde omnis
iste natus error sit voluptatem accusantium doloremque

laudantium, totam rem aperiam, eaque ipsa quae ab illo
<br /><br />
<br />


inventore veritatis et quasi architecto beatae
vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
dolores eos qui ratione voluptatem sequi nesciunt.
<br />
<br />

Fugiat quo voluptas nulla pariatur?`;

initialContent = '';

React.render(
  <div>
    <TinyMCE
      content={initialContent}
      config={{
        browser_spellcheck: true,
        document_base_url: window.location.origin + '/',
        entity_encoding: 'named',
        entities: '160,nbsp',
        extended_valid_elements: 'blockquote[dir|style|cite|class|dir<ltr?rtl],iframe[src|frameborder|style|scrolling|class|width|height|name|align],pre',
        ie7_compat: false,
        image_description: false,
        image_dimensions: false,
        media_alt_source: false,
        media_poster: false,
        media_dimensions: false,
        menubar: false,
        plugins: plugins.join(','),
        relative_urls: false,
        remove_script_host: false,
        skin: 'kindling',
        statusbar: false,
        target_list: false,
        theme: 'kindling',
        toolbar: 'bold italic underline strikethrough | bullist numlist blockquote | link unlink | image media | removeformat code'
      }}
    />
    <Mention
      delimiter={'@'}
      showDebugger={true}
      transformFn={transformDataSource}
      dataSource={complexDataSource}
      customRTEMention={props => {
        const { tinymceId, delimiter, displayLabel } = props;
        return (
          <span>
            <a href='#' id={tinymceId} className='tinymce-mention'>
              {delimiter}{displayLabel}
            </a>
            &nbsp;
          </span>
        );
      }}
      onAdd={({ mentions, changed }) => {
        console.log('ADDED: ', mentions, 'changed: ', changed);
      }}
      onRemove={({ mentions, changed }) => {
        console.log('REMOVED: ', mentions, 'changed: ', changed);
      }}
    />
  </div>
, document.getElementById('mentions'));

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
