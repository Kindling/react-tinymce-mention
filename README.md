# React TinyMCE @Mentions
Provides a simple interface for adding `@mention` functionality into the TinyMCE rich text editor, built with [React.js](http://facebook.github.io/react/) and [Redux](https://github.com/gaearon/redux). Works best with [react-tinymce](https://github.com/mzabriskie/react-tinymce/tree/master), but will work in any environment where `window.tinymce` is available.  


## Installation
`npm install --save react-tinymce-mention`

### Simple Use Case
```javascript
import React from 'react';
import Mention from 'react-tinymce-mention';

class App {
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

React.render(<App />, document.getElementById('id'));
```

In the simplest case, only `dataSource` and a `delimiter` is required; the list containing @mention matches is rendered with a default set of components that you can hijack via stylesheet classes.

### Advanced Use Case
```javascript
import React from 'react';
import Mention from 'react-tinymce-mention';
import axios from 'axios';
import CustomList from './CustomList';

export default class App {
  render() {
    return (
      <Mention
        dataSource={axios.get('http://localhost:3000/shared/api/data.json')}
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

```

# WIP

```
npm install
npm start
npm test
open http://localhost:3000
```
