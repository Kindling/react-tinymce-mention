import React, { PropTypes } from 'react';
import { provide } from 'react-redux';
import { initializePlugin } from 'mention/plugin';
import { finalizeSetup } from 'mention/actions/mentionActions';
import initializeRedux from 'mention/utils/initializeRedux';
import mentionReducer from 'mention/reducers/mentionReducer';
import TinyMCEDelegate from 'mention/components/TinyMCEDelegate';
import SuggestionList from 'mention/components/SuggestionList';
import MentionsDebugger from 'mention/components/MentionsDebugger';

const store = initializeRedux({
  mention: mentionReducer
});

@provide(store)
export default class Mention {

  static propTypes = {
    dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    delimiter: PropTypes.string,
    specialTags: PropTypes.array
  }

  componentDidMount() {
    const { dataSource, delimiter } = this.props;

    initializePlugin(store, dataSource, delimiter).then((editor) => {
      store.dispatch(finalizeSetup(editor, dataSource));
    });
  }

  render() {
    const { dataSource } = this.props;

    return (
      <div>
        <SuggestionList />
        <MentionsDebugger />
        <TinyMCEDelegate />
        <div>
          <h2>
            Available users
          </h2>
          <ul>
            { dataSource.map((source, index) => {
              return (
                <li key={`source-${index}`}>
                  {source}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
