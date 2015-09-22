import React, { PropTypes } from 'react';
import invariant from 'invariant';
import { Provider } from 'react-redux';
import { initializePlugin } from './plugin';
import initializeRedux from './utils/initializeRedux';
import normalizeDataSource from './utils/normalizeDataSource';
import { finalizeSetup } from './actions/mentionActions';
import mentionReducer, { initialState } from './reducers/mentionReducer';
import TinyMCEDelegate from './components/TinyMCEDelegate';
import SuggestionRenderer from './components/SuggestionRenderer';
import MentionsDebugger from './components/MentionsDebugger';

export default class Mention {

  static propTypes = {
    dataSource: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.object
    ]),
    asyncDataSource: PropTypes.func,
    beforeAdd: PropTypes.func,
    customListRenderer: PropTypes.func,
    customRTEMention: PropTypes.func,
    delimiter: PropTypes.string,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    showDebugger: PropTypes.bool,
    transformFn: PropTypes.func
  }

  static defaultProps = {
    delimiter: '@'
  }

  componentWillMount() {
    const { asyncDataSource } = this.props;

    this.store = initializeRedux({ mention: mentionReducer }, {
      mention: {
        ...initialState,
        asyncDataSource
      }
    });
  }

  componentDidMount() {
    const { dataSource = [], delimiter } = this.props;

    initializePlugin(this.store, dataSource, delimiter)
      .then(::this._transformAndDispatch)
      .catch(error => {
        console.error(error);
      });
  }

  _transformResponse(resolvedDataSource, transformFn) {
    const isFunc = typeof transformFn === 'function';

    invariant(isFunc || typeof transformFn === 'undefined',
      'Error initializing plugin: `transformFn` must be a function.'
    );

    const transformedDataSource = isFunc
      ? transformFn(resolvedDataSource)
      : resolvedDataSource;

    return normalizeDataSource(transformedDataSource);
  }

  _transformAndDispatch({ editor, resolvedDataSource }) {
    const { dataSource } = this._transformResponse(resolvedDataSource, this.props.transformFn);
    this.store.dispatch(finalizeSetup(editor, dataSource));
  }

  render() {
    const {
      beforeAdd,
      customListRenderer,
      customRTEMention,
      delimiter,
      onAdd,
      onRemove,
      showDebugger
    } = this.props;

    return (
      <Provider store={this.store}>{() =>
        <div>
          <SuggestionRenderer
            customListRenderer={customListRenderer}
          />
          <TinyMCEDelegate
            delimiter={delimiter}
            customRTEMention={customRTEMention}
            beforeAdd={beforeAdd}
            onAdd={onAdd}
            onRemove={onRemove}
          />
          { showDebugger &&
            <MentionsDebugger /> }
        </div>
      }</Provider>
    );
  }
}
