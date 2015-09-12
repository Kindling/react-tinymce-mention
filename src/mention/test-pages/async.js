import React from 'react';
import Editor from './components/Editor';
import Mention from '../Mention';
import axios from 'axios';

React.render(
  <div>
    <Editor />
    <Mention
      showDebugger={true}
      delimiter={'@'}
      asyncDataSource={(query) => {
        return new Promise(resolve => {
          axios.get(`/examples/shared/api/complex.json?q=${query}`)
            .then(response => {
              resolve(transformDataSource(response.data));
            });
        });
      }}
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
