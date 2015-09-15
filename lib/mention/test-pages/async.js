'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _componentsEditor = require('./components/Editor');

var _componentsEditor2 = _interopRequireDefault(_componentsEditor);

var _Mention = require('../Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _componentsCustomList = require('./components/CustomList');

var _componentsCustomList2 = _interopRequireDefault(_componentsCustomList);

_react2['default'].render(_react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_componentsEditor2['default'], null),
  _react2['default'].createElement(_Mention2['default'], {
    showDebugger: true,
    delimiter: '@',
    asyncDataSource: function (query) {
      return new Promise(function (resolve) {
        _axios2['default'].get('/public/api/complex.json?q=' + query).then(function (response) {
          setTimeout(function () {
            resolve(transformDataSource(response.data));
          }, 500);
        });
      });
    },
    customListRenderer: function (_ref) {
      var highlightIndex = _ref.highlightIndex;
      var matchedSources = _ref.matchedSources;
      var clickFn = _ref.clickFn;
      var fetching = _ref.fetching;

      return _react2['default'].createElement(_componentsCustomList2['default'], {
        fetching: fetching,
        highlightIndex: highlightIndex,
        matchedSources: matchedSources,
        onClick: clickFn
      });
    }
  })
), document.getElementById('root'));

function transformDataSource(dataSource) {
  var complexDataSource = dataSource.map(function (result) {
    var fullName = result.fullName;

    return {
      searchKey: fullName,
      displayLabel: fullName
    };
  });

  return complexDataSource;
}