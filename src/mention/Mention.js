import React, { PropTypes } from 'react'
import invariant from 'invariant'
import { provide } from 'react-redux'
import { initializePlugin } from './plugin'
import initializeRedux from './utils/initializeRedux'
import normalizeDataSource from './utils/normalizeDataSource'
import { finalizeSetup } from './actions/mentionActions'
import mentionReducer from './reducers/mentionReducer'
import TinyMCEDelegate from './components/TinyMCEDelegate'
import SuggestionRenderer from './components/SuggestionRenderer'
import MentionsDebugger from './components/MentionsDebugger'

const store = initializeRedux({
  mention: mentionReducer
})

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
    onAdd: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    transformFn: PropTypes.func
  }

  componentDidMount() {
    const { dataSource, delimiter, onRemove } = this.props

    initializePlugin(store, dataSource, delimiter, onRemove)
      .then(::this._transformAndDispatch)
      .catch(error => {
        console.error(error)
      })
  }

  _transformResponse(resolvedDataSource) {
    const { transformFn } = this.props
    const isFunc = typeof transformFn === 'function'

    invariant(isFunc || typeof transformFn === 'undefined',
      'Error initializing plugin: `transformFn` must be a function.'
    )

    const transformedDataSource = isFunc
      ? transformFn(resolvedDataSource)
      : resolvedDataSource

    return normalizeDataSource(transformedDataSource)
  }

  _transformAndDispatch({ editor, resolvedDataSource }) {
    const { dataSource } = this._transformResponse(resolvedDataSource)
    store.dispatch(finalizeSetup(editor, dataSource))
  }

  render() {
    const { customRenderer, onAdd, onRemove } = this.props

    return (
      <div>
        <SuggestionRenderer
          customRenderer={customRenderer}
        />
        <TinyMCEDelegate
          onAdd={onAdd}
          onRemove={onRemove}
        />
        <MentionsDebugger />
      </div>
    )
  }
}
