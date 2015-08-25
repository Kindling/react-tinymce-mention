import React from 'react';
import Mention from 'react-tinymce-mention';
import axios from 'axios';
import CustomList from './CustomList';

export default class App {
  render() {
    return (
      <Mention
        dataSource={axios.get('http://localhost:3333/shared/api/complex.json')}
        delimiter={'@'}
        transformFn={dataSource => {
          const sorted = dataSource.data.map(result => {
            return {
              id: result.id,
              searchKey: result.fullName,
              displayLabel: result.fullName
            };
          });
          return sorted;
        }}
        onAdd={mention => {
          console.log(mention, ' added');
        }}
        customRenderer={({ highlightIndex, matchedSources, clickFn }) => {
          return (
            <CustomList
              highlightIndex={highlightIndex}
              matchedSources={matchedSources}
              onClick={clickFn}
            />
          )
        }}
      />
    );
  }
}
