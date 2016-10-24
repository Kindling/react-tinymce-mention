import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Editor from './components/Editor';
import Mention from '../Mention';

ReactDOM.render(
  <div>
    <Editor />
    <Mention
      showDebugger={true}
      delimiter={'@'}
      dataSource={axios.get('/public/api/complex.json')}
      transformFn={dataSource => {
        return dataSource.data.map(result => {
          const { fullName } = result;
          return {
            searchKey: fullName,
            displayLabel: fullName
          };
        });
      }}
    />
  </div>
, document.getElementById('root'));
