import React, { PropTypes } from 'react';
import { provide } from 'react-redux';
import { initializePlugin } from 'mention/plugin';
import { setEditor } from 'mention/actions/mentionActions';
import initializeRedux from 'mention/utils/initializeRedux';
import mentionReducer from 'mention/reducers/mentionReducer';
import EditorManager from 'mention/components/EditorManager';
import List from 'mention/components/List';

const store = initializeRedux({
  mention: mentionReducer
});

@provide(store)
export default class Mention {

  static propTypes = {
    dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    delimiter: PropTypes.string
  }

  componentDidMount() {
    const { dataSource, delimiter } = this.props;

    console.log(dataSource);

    initializePlugin(store, dataSource, delimiter).then(editor => {
      store.dispatch(setEditor(editor));
    });
  }

  render() {
    return (
      <div>
        <List />
        <EditorManager />
      </div>
    );
  }
}
