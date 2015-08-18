"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = containsConsistantType;

function containsConsistantType(source, type) {
  return source && type && source.every(function (source) {
    return typeof source === type;
  });
}

module.exports = exports["default"];