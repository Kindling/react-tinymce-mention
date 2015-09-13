import React from 'react';
import axios from 'axios';
import Editor from './components/Editor';
import Mention from '../Mention';
import CustomList from './components/CustomList';

React.render(
  <div>
    <Editor />
    <Mention
      showDebugger={true}
      delimiter={'@'}
      asyncDataSource={(query) => {
        return new Promise(resolve => {
          axios.get(`/public/api/complex.json?q=${query}`)
            .then(response => {
              setTimeout(() => {
                resolve(transformDataSource(response.data));
              }, 500);
            });
        });
      }}
      customListRenderer={({ highlightIndex, matchedSources, clickFn, fetching }) => {
        return (
          <CustomList
            fetching={fetching}
            highlightIndex={highlightIndex}
            matchedSources={matchedSources}
            onClick={clickFn}
          />
        );
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
