
# React TinyMCE @Mentions

[![Build Status](https://travis-ci.org/Kindling/react-tinymce-mention.svg?branch=master)](https://travis-ci.org/Kindling/react-tinymce-mention)

# WIP STAY AWAY!

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

React.render(<App />, document.getElementById('root'));
```

In the simplest case, only `dataSource` and a `delimiter` is required; the list containing `@mention` matches is rendered with a default set of components that you can hijack via stylesheet classes. See `examples/simple` for a working example.

### Advanced Use Case
```javascript
import React from 'react';
import Mention from 'react-tinymce-mention';
import axios from 'axios';
import CustomList from './CustomList';

class App {
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

React.render(<App />, document.getElementById('root'));
```

In the advanced use-case you can define a `dataSource` that returns a promise, as well as a `transformFn` that will transform the resolved dataSource once it comes back.  If you would like greater control over the look and feel of the suggestion list, you can define a `cusomRenderer` function that will return an array of matched items. See `examples/advanced` for a working example.

## Development

```
npm install
npm test
npm start
open http://localhost:3000
```
