import React from 'react';
import Mention from 'react-tinymce-mention';

export default class App {
  render() {
    return (
      <Mention
        dataSource={[
          'hello',
          'how',
          'are',
          'you'
        ]}
        delimiter={'@'}
      />
    );
  }
}
