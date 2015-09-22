import React from 'react';
import Editor from './components/Editor';
import Mention from '../Mention';
import CustomList from './components/CustomList';
import CustomRTEMention from './components/CustomRTEMention';
import complexDataSource from './api/complexDataSource';

React.render(
  <div>
    <Editor />
    <Mention
      showDebugger={true}
      delimiter={'@'}
      dataSource={complexDataSource}
      transformFn={dataSource => {
        return dataSource.map(result => {
          const { fullName } = result;
          return {
            searchKey: fullName,
            displayLabel: fullName
          };
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
      customRTEMention={({ delimiter, displayLabel, id, tinymceId }) => {
        return (
          <CustomRTEMention
            delimiter={delimiter}
            displayLabel={displayLabel}
            id={id}
            tinymceId={tinymceId}
          />
        );
      }}
      beforeAdd={(render, props) => {
        console.log(props);
        return render();
      }}
      onAdd={({ mentions, changed }) => {
        console.log('Added', mentions, changed);
      }}
      onRemove={({ mentions, changed }) => {
        console.log('Removed', mentions, changed);
      }}
    />
  </div>
, document.getElementById('root')
);
