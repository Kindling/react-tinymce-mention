'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsEditor = require('./components/Editor');

var _componentsEditor2 = _interopRequireDefault(_componentsEditor);

var _Mention = require('../Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _componentsCustomList = require('./components/CustomList');

var _componentsCustomList2 = _interopRequireDefault(_componentsCustomList);

var _componentsCustomRTEMention = require('./components/CustomRTEMention');

var _componentsCustomRTEMention2 = _interopRequireDefault(_componentsCustomRTEMention);

var _apiComplexDataSource = require('./api/complexDataSource');

var _apiComplexDataSource2 = _interopRequireDefault(_apiComplexDataSource);

_react2['default'].render(_react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_componentsEditor2['default'], null),
  _react2['default'].createElement(_Mention2['default'], {
    showDebugger: true,
    delimiter: '@',
    dataSource: _apiComplexDataSource2['default'],
    transformFn: function (dataSource) {
      return dataSource.map(function (result) {
        var fullName = result.fullName;

        return {
          searchKey: fullName,
          displayLabel: fullName
        };
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
    },
    customRTEMention: function (_ref2) {
      var delimiter = _ref2.delimiter;
      var displayLabel = _ref2.displayLabel;
      var id = _ref2.id;
      var tinymceId = _ref2.tinymceId;

      return _react2['default'].createElement(_componentsCustomRTEMention2['default'], {
        delimiter: delimiter,
        displayLabel: displayLabel,
        id: id,
        tinymceId: tinymceId
      });
    },
    beforeAdd: function (render, props) {
      console.log(props);
      return render();
    },
    onAdd: function (_ref3) {
      var mentions = _ref3.mentions;
      var changed = _ref3.changed;

      console.log('Added', mentions, changed);
    },
    onRemove: function (_ref4) {
      var mentions = _ref4.mentions;
      var changed = _ref4.changed;

      console.log('Removed', mentions, changed);
    }
  })
), document.getElementById('root'));