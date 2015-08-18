import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import findWhere from 'lodash.findwhere'
import isEqual from 'lodash.isequal'
import mentionReducer from '../mentionReducer'
import simpleDataSource from './fixtures/simple'

import {
  moveDown,
  moveUp,
  query,
  remove,
  resetMentions,
  resetQuery,
  select,
} from '../../actions/mentionActions'

describe('mentionReducer', () => {
  var store

  const dataSource = simpleDataSource.sort().map(source => {
    return {
      searchKey: source,
      displayLabel: source
    }
  })

  const getState = () => {
    const state = store.getState()
    state.mentions.forEach(mention => delete mention.tinymceId)
    return state
  }

  const find = (name) => findWhere(dataSource, { displayLabel: name })

  beforeEach(function() {
    jasmine.addMatchers({
      toDeepEqual: function() {
        return {
          compare: function(actual, expected) {
            return {
              pass: isEqual(actual, expected)
            }
          }
        }
      }
    })

    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

    store = createStoreWithMiddleware(mentionReducer, {
      dataSource: dataSource,
      highlightIndex: 0,
      mentions: [],
      query: ''
    })
  })

  it('should update the current lookup query', () => {
    store.dispatch(query('alex'))
    expect(getState().query).toBe('alex')
    expect(getState().matchedSources).toDeepEqual([
      find('alex gray'),
      find('alex gutierrez'),
      find('alexandra spell'),
    ])

    store.dispatch(query('chris'))
    expect(getState().matchedSources).toDeepEqual([
      find('chris pappas'),
      find('christopher pappas'),
    ])

    store.dispatch(query(''))
    expect(getState().matchedSources).toDeepEqual([])

    store.dispatch(query('c'))
    store.dispatch(query('h'))
    store.dispatch(query('r'))
    expect(getState().matchedSources).toDeepEqual([
      find('chris pappas'),
      find('christopher pappas'),
    ])
  })

  it('should reset the lookup query', () => {
    store.dispatch(query('alex'))
    expect(getState().matchedSources).toDeepEqual([
      find('alex gray'),
      find('alex gutierrez'),
      find('alexandra spell')
    ])

    store.dispatch(resetQuery())
    expect(getState().matchedSources).toDeepEqual([])
  })

  it('should select the currently highlighted item', () => {
    store.dispatch(query('ka'))
    store.dispatch(moveDown())
    expect(getState().highlightIndex).toBe(1)
    store.dispatch(moveDown())
    expect(getState().highlightIndex).toBe(2)
    store.dispatch(select())
    expect(getState().mentions).toEqual([
      find('katy curtis')
    ])
    store.dispatch(query('garrett'))
    store.dispatch(select())
    expect(getState().mentions).toEqual([
      find('katy curtis'),
      find('garrett kalleberg'),
    ])
  })

  it('should move the highlighter down', () => {
    store.dispatch(query('ka'))
    expect(getState().matchedSources).toDeepEqual([
      find('garrett kalleberg'),
      find('katherine curtis'),
      find('katy curtis')
    ])

    store.dispatch(moveDown())
    expect(getState().highlightIndex).toBe(1)
    store.dispatch(moveDown())
    store.dispatch(moveDown())
    expect(getState().highlightIndex).toBe(0)
    store.dispatch(moveDown())
    expect(getState().highlightIndex).toBe(1)
  })

  it('should move the highlighter up', () => {
    store.dispatch(query('ka'))
    expect(getState().matchedSources).toDeepEqual([
      find('garrett kalleberg'),
      find('katherine curtis'),
      find('katy curtis')
    ])

    store.dispatch(moveUp())
    expect(getState().highlightIndex).toBe(2)
    store.dispatch(moveUp())
    store.dispatch(moveUp())
    expect(getState().highlightIndex).toBe(0)
    store.dispatch(moveUp())
    expect(getState().highlightIndex).toBe(2)
  })

  it('should remove the selected item if no characters match from query', function() {
    store.dispatch(query('kalleberg'))
    expect(getState().matchedSources).toDeepEqual([
      find('garrett kalleberg')
    ])

    store.dispatch(select())
    expect(getState().mentions).toDeepEqual([
      find('garrett kalleberg')
    ]);

    store.dispatch(query('chris'))
    expect(getState().matchedSources).toDeepEqual([
      find('chris pappas'),
      find('christopher pappas')
    ])

    store.dispatch(moveDown())
    store.dispatch(select())
    expect(getState().mentions).toDeepEqual([
      find('garrett kalleberg'),
      find('christopher pappas')
    ])

    store.dispatch(remove('christopher pappas'))
    expect(getState().mentions).toDeepEqual([
      find('garrett kalleberg')
    ])

    store.dispatch(remove('garrett kalleberg'))
    expect(getState().mentions).toDeepEqual([])
  })

  it('should reset mentions', () => {
    store.dispatch(query('chris'))
    expect(getState().matchedSources).toDeepEqual([
      find('chris pappas'),
      find('christopher pappas'),
    ])

    store.dispatch(resetMentions())
    expect(getState().mentions).toDeepEqual([])
    expect(getState().matchedSources).toDeepEqual([])
    expect(getState().query).toDeepEqual('')
  })

})
