import React from 'react';
import Editor from './components/Editor';
import Mention from '../Mention';
import simpleDataSource from './api/simpleDataSource';

React.render(
  <div>
    <Editor />
    <Mention
      delimiter={'@'}
      showDebugger={true}
      dataSource={simpleDataSource}
    />
  </div>
, document.getElementById('root')
);
