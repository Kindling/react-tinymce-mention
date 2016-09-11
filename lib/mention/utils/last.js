"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = last;

function last(arr) {
  return arr ? arr.slice(-1)[0] : [];
}

module.exports = exports["default"];