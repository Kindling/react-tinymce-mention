import React, { PropTypes } from 'react';
import invariant from 'invariant';
import { provide } from 'react-redux';
import { initializePlugin } from 'mention/plugin';
import { finalizeSetup } from 'mention/actions/mentionActions';
import initializeRedux from 'mention/utils/initializeRedux';
import mentionReducer from 'mention/reducers/mentionReducer';
import TinyMCEDelegate from 'mention/components/TinyMCEDelegate';
import SuggestionRenderer from 'mention/components/SuggestionRenderer';
import MentionsDebugger from 'mention/components/MentionsDebugger';

const store = initializeRedux({
  mention: mentionReducer
});

@provide(store)
export default class Mention {

  static propTypes = {
    dataSource: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.object
    ]).isRequired,
    customRenderer: React.PropTypes.func,
    delimiter: PropTypes.string,
    transformFn: PropTypes.func
  }

  componentDidMount() {
    const { dataSource, delimiter } = this.props;

    initializePlugin(store, dataSource, delimiter)
      .then(::this._transformAndDispatch)
      .catch((error) => {
        console.error(error);
      });
  }

  _transformAndDispatch({ editor, resolvedDataSource }) {
    const dataSource = this._transformResponse(resolvedDataSource);
    store.dispatch(finalizeSetup(editor, dataSource));
  }

  _transformResponse(resolvedDataSource) {
    const { transformFn } = this.props;
    const isFunc = typeof transformFn === 'function';

    invariant(isFunc || typeof transformFn === 'undefined',
      'Error initializing plugin: `transformFn` must be a function.'
    );

    const transformedDataSource = isFunc
      ? transformFn(resolvedDataSource)
      : resolvedDataSource;

    invariant(transformedDataSource instanceof Array,
      'Error transforming response: `transformedDataSource` must be an array.'
    );

    return transformedDataSource;
  }

  render() {
    const { customRenderer } = this.props;

    return (
      <div>
        <SuggestionRenderer
          customRenderer={customRenderer}
        />
        <TinyMCEDelegate />
        <MentionsDebugger />
      </div>
    );
  }
}
