
# React TinyMCE @Mention

[![Build Status](https://travis-ci.org/Kindling/react-tinymce-mention.svg?branch=master)](https://travis-ci.org/Kindling/react-tinymce-mention)
[![npm version](https://badge.fury.io/js/react-tinymce-mention.svg)](http://badge.fury.io/js/react-tinymce-mention)

Provides a simple yet flexible interface for adding `@mention` functionality into the TinyMCE rich text editor, built with [React.js](http://facebook.github.io/react/) and [Redux](https://github.com/gaearon/redux). Supports data sources that are simple Arrays as well as Promises, allows for data transformations, and exposes an interface for defining your own custom dropdown select menu.

Out of the box support for all major browsers and IE 9-11, and will work with IE8 assuming your app implements a polyfill before the plugin is loaded (see https://babeljs.io/docs/usage/polyfill for instructions).

Works best with [react-tinymce](https://github.com/mzabriskie/react-tinymce/tree/master), but will work in any environment where `window.tinymce` is available.

(NOTE: While this plugin is currently coupled with TinyMCE, extracting it from the current implementation should be fairly simple and we plan on releasing adaptors for other editors in the future.)

![mentions](https://cloud.githubusercontent.com/assets/236943/9835207/4bd00be6-5993-11e5-8cdf-cf40a42f4498.gif)

## Installation
`npm install --save react-tinymce-mention`

### Simple Use Case
```javascript
import React from 'react';
import Mention from 'react-tinymce-mention';
import Editor from './components/Editor';

React.render(
  <div>
    <Editor />
    <Mention dataSource={[
      'hello',
      'how',
      'are',
      'you'
    ]}
    />
  </div>
, document.getElementById('root')
);
```

In the simplest case, only `dataSource` is required; the list containing `@mention` matches is rendered with a default set of components that you can hijack via stylesheet classes. See `src/mention/test-pages/simple.js` for a working example.

### Advanced (Complete API, minus `asyncDataSource`)
```javascript
import React from 'react';
import Mention from 'react-tinymce-mention';
import Editor from './components/Editor';
import CustomList from './components/CustomList';
import CustomRTEMention from './components/CustomRTEMention';
import complexDataSource from './api/complexDataSource';

React.render(
  <div>
    <Editor />
    <Mention
      delimiter={'@'}
      dataSource={complexDataSource}
      transformFn={dataSource => {
        return dataSource.map(result => {
          const { fullName } = result;

          // When transforming your dataSource, a `displayLabel` and
          // `searchKey` is required
          return {
            displayLabel: fullName,
            searchKey: fullName
          };
        });
      }}
      customListRenderer={({ clickFn, fetching, highlightIndex, matchedSources }) => {
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
      onAdd={({ changed, mentions }) => {
        console.log('Added', changed, mentions)
      }}
      onRemove={({ changed, mentions }) => {
        console.log('Removed', changed, mentions);
      }}
      showDebugger={true}
    />
  </div>
, document.getElementById('root')
);
```

In the advanced use-case you can define a
  - `dataSource` - Array or Promise
  - `delimiter` - Either '@' (default) or '#'.
  - `transformFn` - a function that processes your dataSource before it is injected into the plugin.
  - `customListRenderer` - A function that returns a component, allowing you to define your own dropdown list.
  - `customRTEMention` - A component that represents what is inserted into the TinyMCE input window. (Note: TinyMCE is aggressive about cleaning up markup as well as the format, so follow something similar to the example)
  - `onAdd` - A function that is called whenever you select a mention and it is inserted into the editor.
  - `onRemove` - Similar to the above, this function is called whenever a mention is removed.
  - `showDebugger` - Useful when developing a custom dropdown list, enabling this switch allows you to see all of the items available for selection as well as the mentions that have been currently selected.

See `src/mention/test-pages/advanced.js` for a working example.


### Promise Example
```javascript
import React from 'react';
import Mention from 'react-tinymce-mention';
import axios from 'axios';
import Editor from './components/Editor';

React.render(
  <div>
    <Editor />
    <Mention
      showDebugger={true}
      delimiter={'#'}
      dataSource={axios.get('/public/api/complex.json')}
      transformFn={dataSource => {
        return dataSource.data.map(result => {
          const { fullName } = result;
          return {
            searchKey: fullName,
            displayLabel: fullName
          };
        });
      }}
    />
  </div>
, document.getElementById('root'));
```

In this example, if you pass in a Promise one of the hard requirements is that the array you return from your `transformFn` conforms to the above -- a `searchKey` and `displayLabel` is required. If you forget these properties an error will be thrown.

See `src/mention/test-pages/promise.js` for a working example.


### Async Example
```javascript
import React from 'react';
import Mention from 'react-tinymce-mention';
import axios from 'axios';
import Editor from './components/Editor';
import CustomList from './components/CustomList';

React.render(
  <div>
    <Editor />
    <Mention
      showDebugger={true}
      delimiter={'@'}
      asyncDataSource={query => {
        return new Promise(resolve => {
          axios.get(`/public/api/complex.json?q=${query}`)
            .then(response => {
              resolve(transformDataSource(response.data));
            });
        });
      }}
      customListRenderer={({ clickFn, fetching, highlightIndex, matchedSources }) => {
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
  return dataSource.map(result => {
    const { fullName } = result;
    return {
      searchKey: fullName,
      displayLabel: fullName
    };
  });
}
```

Lastly, if you would like to implement a Mention component that queries a an API when the user types, define an `asynDataSource`. As with the Promise example above, your final dataSource will need to conform to the `searchKey` and `displayLabel` requirement.

See `src/mention/test-pages/async.js` for a working example.


## Troubleshooting
If you are not using `react-tinymce` and find that editor errors out stating that it can't find the Mention plugin to load, try initializing the plugin before your instance of TinyMCE.


## Development
Example implementations have been given in `src/mention/test-pages`. To enable, uncomment the relevant line in `src/index.js` and save.

```
npm install
npm test (or) npm run test-watch
npm start
open http://localhost:3333
```

## TODO
- More tests
