'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = validateDataSource;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _containsConsistantType = require('./containsConsistantType');

var _containsConsistantType2 = _interopRequireDefault(_containsConsistantType);

function validateDataSource(dataSource) {
  (0, _invariant2['default'])(dataSource instanceof Array, 'Error transforming response: `transformedDataSource` must be an array.');

  // Array of ojects with a `searchKey`
  if ((0, _containsConsistantType2['default'])(dataSource, 'object')) {

    // Validate that each object has `searchKey`
    var isValid = dataSource.every(function (s) {
      return s.hasOwnProperty('searchKey') && typeof s.searchKey === 'string';
    });

    (0, _invariant2['default'])(isValid, 'Each object in the `transformedDataSource` should contain a `searchKey` ' + 'property that is a string.');

    return {
      dataSource: dataSource
    };
  } else if ((0, _containsConsistantType2['default'])(dataSource, 'string')) {
    var normalizedDataSource = dataSource.map(function (source) {
      return {
        searchKey: source,
        displayLabel: source
      };
    });

    return {
      dataSource: normalizedDataSource
    };
  } else {
    throw new Error('Validation Error: `transformedDataSource` must be an array of strings ' + 'or contain objects with a `searchKey` property.');
  }
}

module.exports = exports['default'];