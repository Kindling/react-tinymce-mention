import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/Editor';
import Mention from '../Mention';
import simpleDataSource from './api/simpleDataSource';

ReactDOM.render(
  <div>
    <Editor />
    <Mention
      showDebugger={true}
      dataSource={simpleDataSource}
    />
  </div>,
  document.getElementById('root')
);
