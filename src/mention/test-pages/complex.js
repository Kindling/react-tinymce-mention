import React from 'react';
import Editor from './components/Editor';
import Mention from '../Mention';
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
          <MentionList
            fetching={fetching}
            highlightIndex={highlightIndex}
            matchedSources={matchedSources}
            onClick={clickFn}
          />
        );
      }}
      customRTEMention={({ delimiter, displayLabel, tinymceId }) => {
        return (
          <CustomRTEMention
            delimiter={delimiter}
            displayLabel={displayLabel}
            tinymceId={tinymceId}
          />
        );
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
