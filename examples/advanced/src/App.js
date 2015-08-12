import React from 'react';
import Mention from 'react-tinymce-mention';
import axios from 'axios';
import CustomList from './CustomList';

export default class App {
  render() {
    return (
      <Mention
        dataSource={axios.get('http://localhost:3000/examples/shared/api/data.json')}
        delimiter={'@'}
        transformFn={dataSource => {
          return dataSource.sort().reverse();
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
