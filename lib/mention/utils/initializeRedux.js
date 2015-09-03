'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = initializeRedux;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _reduxBatchedUpdates = require('redux-batched-updates');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function initializeRedux(reducers, initialState) {
  var reducer = (0, _redux.combineReducers)(reducers);
  var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2['default'], _reduxBatchedUpdates.batchedUpdatesMiddleware)(_redux.createStore);
  return createStoreWithMiddleware(reducer, initialState);
}

module.exports = exports['default'];