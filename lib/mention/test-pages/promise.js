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

_react2['default'].render(_react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_componentsEditor2['default'], null),
  _react2['default'].createElement(_Mention2['default'], {
    showDebugger: true,
    delimiter: '@',
    dataSource: _axios2['default'].get('/examples/shared/api/complex.json'),
    transformFn: function (dataSource) {
      return dataSource.data.map(function (result) {
        var fullName = result.fullName;

        return {
          searchKey: fullName,
          displayLabel: fullName
        };
      });
    }
  })
), document.getElementById('root'));