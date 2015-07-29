import 'babel/polyfill';
import React from 'react';
import TinyMCE from 'react-tinymce';
import Mention from './Mention';

React.render(
  <div>
    <Mention />
    <TinyMCE
      content='sample content'
      config={{
        plugins: 'autolink code link image lists mention print preview',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',

        mention: {
          source: [
            { name: 'Tyra Porcelli' },
            { name: 'Brigid Reddish' },
            { name: 'Ashely Buckler' },
            { name: 'Teddy Whelan' }
          ]
        }
      }}
      onChange={() => {
        //this.handleEditorChange()
      }}
    />

  </div>
, document.getElementById('root'));
