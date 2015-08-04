import React, { PropTypes } from 'react';
import { provide } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import DiffMonitor from 'redux-devtools-diff-monitor';
import { initializePlugin } from 'mention/plugin';
// import { finalizeSetup } from 'mention/actions/mentionActions';
import initializeRedux from 'mention/utils/initializeRedux';
import mentionReducer from 'mention/reducers/mentionReducer';
import EditorManager from 'mention/components/EditorManager';
import List from 'mention/components/List';
import dataSourceStatic from 'mention/reducers/__test__/fixtures/dataSourceStatic';

const store = initializeRedux({
  mention: mentionReducer
}, {
  mention: {
    dataSource: dataSourceStatic,
    highlightIndex: 0,
    matchedSources: [],
    mentions: [],
    query: ''
  }
});

@provide(store)
export default class Mention {

  static propTypes = {
    dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    delimiter: PropTypes.string
  }

  componentDidMount() {
    const { dataSource, delimiter } = this.props;

    initializePlugin(store, dataSource, delimiter).then(() => {
      // FIXME: This creates a circular ref when using the dev tools
      // store.dispatch(finalizeSetup(editor, dataSource));
    });
  }

  render() {
    return (
      <div>
        <List />
        <EditorManager />
        <DevTools store={store} monitor={DiffMonitor} />
      </div>
    );
  }
}
