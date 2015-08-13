import React from 'react';
import TinyMCE from 'react-tinymce';
import axios from 'axios';
import Mention from './Mention';
import CustomList from './components/CustomList';

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

React.render(
  <div>
    <TinyMCE
      content=''
      config={{
        browser_spellcheck: true,
        document_base_url: window.location.origin + '/',
        extended_valid_elements: 'blockquote[dir|style|cite|class|dir<ltr?rtl],iframe[src|frameborder|style|scrolling|class|width|height|name|align],pre',
        forced_root_block : '',
        ie7_compat: false,
        image_description: false,
        image_dimensions: false,
        media_alt_source: false,
        media_poster: false,
        media_dimensions: false,
        menubar: false,
        plugins: plugins.join(','),

        // We always want the _full URL_ - not the relative path.
        relative_urls: false,
        remove_script_host: false,
        skin: 'kindling',
        statusbar: false,

        // Suppress the target option for links.
        target_list: false,
        theme: 'kindling',
        toolbar: 'bold italic underline strikethrough | bullist numlist blockquote | link unlink | image media | removeformat code'
      }}
    />

    <Mention
      dataSource={axios.get('examples/shared/api/complex.json')}
      delimiter={'@'}
      transformFn={dataSource => {
        const { results } = dataSource;

        const searchableDataSource = results.map(result => {
          const { fullName } = result;
          return {
            searchKey: fullName,
            displayLabel: fullName
          };
        })

        return searchableDataSource;
      }}
      onAdd={mention => {
        console.log(mention, ' added');
      }}
      customRenderer={({ highlightIndex, matchedSources, clickFn }) => {
        console.log(matchedSources);
        return (
          <CustomList
            highlightIndex={highlightIndex}
            matchedSources={matchedSources}
            onClick={clickFn}
          />
        )
      }}
    />

  </div>
, document.getElementById('root'));
